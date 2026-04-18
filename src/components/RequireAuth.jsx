import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { hasAnyPermission, hasAllPermissions } from '../utils/permissions';

const readJson = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null');
  } catch {
    return null;
  }
};

const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const isJwtExpired = (token) => {
  if (!token || typeof token !== 'string') return true;
  const parts = token.split('.');
  if (parts.length !== 3) return true;

  try {
    const payloadJson = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadJson);

    // If token has no exp, treat as non-expiring (fallback to existence check).
    if (payload?.exp === undefined || payload?.exp === null) return false;

    const nowSec = Math.floor(Date.now() / 1000);
    return Number(payload.exp) <= nowSec;
  } catch {
    return true;
  }
};

export default function RequireAuth({ children }) {
  const location = useLocation();

  const token = localStorage.getItem('token');
  const user = readJson('user');

  if (!token || isJwtExpired(token)) {
    clearAuth();
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  // Optional: if user status is deactivated, still allow navigation
  // because the app uses a special dashboard route for deactivated users.
  // (Backend should enforce real access control.)
  void user;

  const path = location.pathname || '/';
  const isAllowedByPath = (pathname) => {
    // Main panel is always reachable.
    if (pathname === '/dashboard') return true;

    // Dashboard page
    if (pathname.startsWith('/dashboard/dashboard')) return hasAnyPermission('Access_Dashbord', 'dashboards');

    // Users module (more specific routes first)
    if (pathname.startsWith('/users/add_users')) return hasAllPermissions('Access_Users', 'Add New User');
    if (pathname.startsWith('/users/add_role')) return hasAllPermissions('Access_Users', 'Add New Role');
    if (pathname.startsWith('/users/add_permission')) return hasAllPermissions('Access_Users', 'Add New Permission');
    if (pathname.startsWith('/users/user_list')) return hasAllPermissions('Access_Users', 'User List View');
    if (pathname.startsWith('/users/role_list')) return hasAllPermissions('Access_Users', 'Role List View');
    if (pathname.startsWith('/users/permission_list')) return hasAllPermissions('Access_Users', 'Permission List View');
    if (pathname.startsWith('/users/edit_users')) return hasAllPermissions('Access_Users', 'User Update');
    if (pathname.startsWith('/users/edit_role')) return hasAllPermissions('Access_Users', 'Role Update');
    if (pathname.startsWith('/users/edit_permission')) return hasAllPermissions('Access_Users', 'Permission Update');
    if (pathname.startsWith('/users')) return hasAnyPermission('Access_Users');

    // Users module
    // Items module
    if (pathname.startsWith('/item/add_item')) return hasAllPermissions('Access_Items', 'Add new Item');
    if (pathname.startsWith('/item')) return hasAnyPermission('Access_Items');

    // Stock module
    if (pathname.startsWith('/stock')) return hasAnyPermission('Access_Stock');

    // Sales module
    if (pathname.startsWith('/sales/billing')) return hasAnyPermission('Access_Billing');
    if (pathname.includes('due_amount')) return hasAnyPermission('Access Due Amount', 'Access_Sales');
    if (pathname.startsWith('/sales')) return hasAnyPermission('Access_Sales', 'Access_Billing');

    // Customers module
    if (pathname.startsWith('/customers/add_customer')) return hasAllPermissions('Access_Customers', 'Add New Customers');
    if (pathname.startsWith('/customers/customer_list')) return hasAllPermissions('Access_Customers', 'View Customer List');
    if (pathname.startsWith('/customers') || pathname.startsWith('/customers_invoices')) return hasAnyPermission('Access_Customers');

    // Suppliers module
    if (pathname.startsWith('/suppliers')) return hasAnyPermission('Access_Suppliers');

    // Expenses module
    if (pathname.startsWith('/expenses')) return hasAnyPermission('Access_Expenses');

    // Finance module
    if (pathname.startsWith('/finance')) return hasAnyPermission('Access_Finance', 'Finance Management');

    // Reports module
    if (pathname.startsWith('/reports')) return hasAnyPermission('Access_Reports', 'Generate Stock Report');

    // Settings module
    if (pathname.startsWith('/settings')) return hasAnyPermission('Access_Settings');

    // Unknown routes: allow.
    return true;
  };

  if (!isAllowedByPath(path)) {
    return <Navigate to="/dashboard" replace state={{ from: location.pathname }} />;
  }

  useEffect(() => {
    // Keep permissions reasonably fresh for dashboard visibility.
    const tokenNow = localStorage.getItem('token');
    if (!tokenNow) return;

    fetch('/api/users/me/permissions', {
      headers: { Authorization: `Bearer ${tokenNow}` },
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || 'Failed to load permissions');
        return data;
      })
      .then((data) => {
        const names = Array.isArray(data?.permissions)
          ? data.permissions.map((p) => String(p.permissions_name || '')).filter(Boolean)
          : [];
        localStorage.setItem('permissions', JSON.stringify(names));
      })
      .catch(() => {
        // ignore; keep existing permissions in storage
      });
  }, []);

  return <>{children}</>;
}
