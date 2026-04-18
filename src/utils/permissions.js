export const readPermissionNames = () => {
  try {
    const raw = localStorage.getItem('permissions');
    const parsed = JSON.parse(raw || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const getPermissionSet = () => {
  const names = readPermissionNames();
  return new Set(
    names
      .map((p) => String(p || '').trim().toLowerCase())
      .filter(Boolean)
  );
};

// If permissions are not loaded yet, return true to avoid accidental lockout.
export const hasAnyPermission = (...permissionNames) => {
  const permSet = getPermissionSet();
  if (permSet.size === 0) return true;
  return permissionNames.some((n) => permSet.has(String(n || '').trim().toLowerCase()));
};

export const hasAllPermissions = (...permissionNames) => {
  const permSet = getPermissionSet();
  if (permSet.size === 0) return true;
  return permissionNames.every((n) => permSet.has(String(n || '').trim().toLowerCase()));
};
