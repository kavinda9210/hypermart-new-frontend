
import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../../../components/Layout';
import './EditRole.css';
import { useNavigate, useParams } from 'react-router-dom';

const EditRole = () => {
  const navigate = useNavigate();
  const params = useParams();
  const roleId = params?.id;

  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [initialRoleName, setInitialRoleName] = useState('');
  const [initialCheckedIds, setInitialCheckedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const checkedIds = useMemo(
    () => permissions.filter((p) => p.checked).map((p) => Number(p.id)),
    [permissions]
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/', { replace: true });
      return;
    }

    if (!roleId) {
      navigate('/users/role_list', { replace: true });
      return;
    }

    setLoading(true);
    setError('');

    Promise.all([
      fetch('/api/users/permissions', { headers: { Authorization: `Bearer ${token}` } }),
      fetch(`/api/users/roles/${encodeURIComponent(roleId)}/permissions`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ])
      .then(async ([permsRes, rolePermsRes]) => {
        const permsData = await permsRes.json().catch(() => ({}));
        const rolePermsData = await rolePermsRes.json().catch(() => ({}));

        if (!permsRes.ok) throw new Error(permsData?.error || 'Failed to load permissions');
        if (!rolePermsRes.ok) throw new Error(rolePermsData?.error || 'Failed to load role permissions');

        const all = Array.isArray(permsData?.permissions) ? permsData.permissions : [];
        const role = rolePermsData?.role;
        const ids = Array.isArray(rolePermsData?.permission_ids) ? rolePermsData.permission_ids : [];
        const idSet = new Set(ids.map((n) => Number(n)));

        setRoleName(String(role?.role_name || ''));
        setInitialRoleName(String(role?.role_name || ''));
        setInitialCheckedIds(ids.map((n) => Number(n)));
        setPermissions(
          all.map((p) => ({
            id: p.id,
            label: p.permissions_name,
            checked: idSet.has(Number(p.id)),
          }))
        );
      })
      .catch((e) => setError(e?.message || 'Failed to load data'))
      .finally(() => setLoading(false));
  }, [navigate, roleId]);

  const handlePermissionChange = (id) => {
    setPermissions((prev) =>
      prev.map((perm) =>
        perm.id === id ? { ...perm, checked: !perm.checked } : perm
      )
    );
  };

  const handleSelectAll = () => {
    setPermissions((prev) => prev.map((perm) => ({ ...perm, checked: true })));
  };

  const handleDeselectAll = () => {
    setPermissions((prev) => prev.map((perm) => ({ ...perm, checked: false })));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/', { replace: true });
      return;
    }

    if (!roleId) {
      navigate('/users/role_list', { replace: true });
      return;
    }

    const nextName = String(roleName || '').trim();
    if (!nextName) {
      setError('Role name is required.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/users/roles/${encodeURIComponent(roleId)}/permissions`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          role_name: nextName,
          permission_ids: checkedIds,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Failed to update role permissions');

      alert('Role updated!');
      navigate('/users/role_list');
    } catch (err) {
      setError(err?.message || 'Failed to update role permissions');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setRoleName(initialRoleName);
    const initialSet = new Set((initialCheckedIds || []).map((n) => Number(n)));
    setPermissions((prev) => prev.map((p) => ({ ...p, checked: initialSet.has(Number(p.id)) })));
  };

  return (
    <Layout>
      <div className="">
        <div className="px-12 py-5 max-sm:px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                <p className="inline-flex items-center text-sm font-medium text-gray-700 text-nowrap">Main Panel</p>
              </li>
              <li aria-current="page" className="inline-flex items-center">
                <svg className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2 text-nowrap">Update Role</p>
              </li>
            </ol>
          </nav>
        </div>

        <div className="p-6">
          <div className="flex flex-col flex-grow h-full p-6 border-2 rounded-lg">
            <form onSubmit={handleSubmit} onReset={handleReset}>
              {/* Role Name */}
              <div>
                <label htmlFor="role" className="block mb-2 text-sm font-medium text-black">Role Name</label>
                <input
                  id="role"
                  name="role"
                  type="text"
                  value={roleName}
                  onChange={e => setRoleName(e.target.value)}
                  disabled={loading || saving}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Enter role name"
                />
              </div>
              <br />

              {error && (
                <div className="mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg p-3">
                  {error}
                </div>
              )}

              {/* select, deselect all buttons */}
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-black">Permissions</label>
                <div className="flex gap-2">
                  <button type="button" onClick={handleSelectAll} className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700">Select All</button>
                  <button type="button" onClick={handleDeselectAll} className="px-4 py-2 text-sm text-white bg-gray-600 rounded-lg hover:bg-gray-700">Deselect All</button>
                </div>
              </div>

              {/* Permissions Checkboxes */}
              <div className="grid gap-6 mb-6 md:grid-cols-5 max-md:grid-cols-3 max-sm:grid-cols-1">
                {permissions.map((perm) => (
                  <div className="flex items-center me-4" key={perm.id}>
                    <input
                      id={`permission-${perm.id}`}
                      type="checkbox"
                      name="permissions[]"
                      value={perm.id}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      checked={perm.checked}
                      disabled={loading || saving}
                      onChange={() => handlePermissionChange(perm.id)}
                    />
                    <label htmlFor={`permission-${perm.id}`} className="text-sm font-medium text-gray-900 ms-2">{perm.label}</label>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-center w-full gap-4 max-sm:flex-col max-sm:p-0">
                <button type="submit" disabled={loading || saving} className="py-3 px-6 bg-[#029ED9] text-white rounded-lg disabled:opacity-60">{saving ? 'Updating...' : 'Update'}</button>
                <button type="reset" disabled={loading || saving} className="px-6 py-3 text-white bg-black rounded-lg disabled:opacity-60">Reset</button>
                <button type="button" disabled={loading || saving} className="px-6 py-3 text-white bg-red-600 rounded-lg disabled:opacity-60" onClick={() => navigate('/users/role_list')}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditRole;