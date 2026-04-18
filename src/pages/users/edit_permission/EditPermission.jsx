import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../../components/Layout';
import './EditPermission.css';

const EditPermission = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [permission, setPermission] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      navigate('/users/permission_list', { replace: true });
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('user');
      window.location.assign('/');
      return;
    }

    setLoading(true);
    setError('');
    fetch(`/api/users/permissions/${encodeURIComponent(String(id))}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || 'Failed to load permission');
        return data;
      })
      .then((data) => {
        setPermission(String(data?.permission?.permissions_name || ''));
      })
      .catch((err) => setError(String(err?.message || 'Failed to load permission')))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleCancel = () => {
    navigate('/users/permission_list');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('user');
      window.location.assign('/');
      return;
    }

    const name = String(permission || '').trim();
    if (!name) {
      setError('Permission is required.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const resp = await fetch(`/api/users/permissions/${encodeURIComponent(String(id))}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ permissions_name: name }),
      });

      const data = await resp.json().catch(() => ({}));

      if (resp.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.assign('/');
        return;
      }

      if (!resp.ok) {
        setError(data?.error || 'Failed to update permission.');
        return;
      }

      alert('Permission updated successfully!');
      navigate('/users/permission_list');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col flex-grow">
        <div className="px-12 py-5 max-sm:px-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <span className="inline-flex items-center text-sm font-medium text-gray-700 text-nowrap">
                  <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Main Panel
                </span>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700 ms-1 md:ms-2 text-nowrap">Users</span>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700 ms-1 md:ms-2 text-nowrap">Update Permission</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="p-6">
          {error ? (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800" role="alert">
              {error}
            </div>
          ) : null}

          <div className="flex flex-col flex-grow h-full p-6 border-2 rounded-lg bg-white">
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="grid gap-6 mb-6 md:grid-cols-1">
                <div>
                  <label htmlFor="permission" className="block mb-2 text-sm font-medium text-black">Permission</label>
                  <input
                    id="permission"
                    name="permission"
                    type="text"
                    value={permission}
                    onChange={(e) => setPermission(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter permission"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center w-full gap-4 max-sm:flex-col max-sm:p-0">
                <button type="submit" className="py-3 px-6 bg-[#3c8c2c] text-white rounded-lg max-sm:py-1 max-sm:px-3 max-sm:w-full" disabled={loading}>
                  {loading ? 'Updating…' : 'Update'}
                </button>
                <button type="button" className="px-6 py-3 text-white bg-red-600 rounded-lg max-sm:py-1 max-sm:px-3 max-sm:w-full" onClick={handleCancel} disabled={loading}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex-grow" />
      </div>
    </Layout>
  );
};

export default EditPermission;