
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../../components/Layout';
import './EditUsers.css';

const EditUsers = () => {
  const alertRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const userId = useMemo(() => {
    const qs = new URLSearchParams(location.search || '');
    return location.state?.userId || qs.get('id');
  }, [location]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [roles, setRoles] = useState([]);
  const [branches, setBranches] = useState([]);

  const [initialForm, setInitialForm] = useState(null);
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    gender: '',
    email: '',
    password: '',
    password_confirmation: '',
    roles_id: '',
    branch_id: '',
    yearly_leave_allowance: '0',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    let me = null;
    try {
      me = JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      me = null;
    }

    if (!token) {
      navigate('/', { replace: true });
      return;
    }

    if (Number(me?.status_id ?? 1) === 0) {
      navigate('/dashboard/dashboard', { replace: true });
      return;
    }

    if (!userId) {
      navigate('/users/user_list', { replace: true });
      return;
    }

    (async () => {
      setIsLoading(true);
      setError(null);

      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [uRes, rRes, bRes] = await Promise.all([
          fetch(`/api/users/${encodeURIComponent(userId)}`, { headers }),
          fetch('/api/users/roles', { headers }),
          fetch('/api/users/branches', { headers }),
        ]);

        const uData = await uRes.json().catch(() => ({}));
        const rData = await rRes.json().catch(() => ({}));
        const bData = await bRes.json().catch(() => ({}));

        if (!uRes.ok) throw new Error(uData?.error || 'Failed to load user');
        if (!rRes.ok) throw new Error(rData?.error || 'Failed to load roles');
        if (!bRes.ok) throw new Error(bData?.error || 'Failed to load branches');

        setRoles(Array.isArray(rData?.roles) ? rData.roles : []);
        setBranches(Array.isArray(bData?.branches) ? bData.branches : []);

        const u = uData?.user || {};
        const next = {
          name: u?.name || '',
          mobile: u?.mobile || '',
          gender: u?.gender || '',
          email: u?.email || '',
          password: '',
          password_confirmation: '',
          roles_id: u?.roles_id === null || u?.roles_id === undefined ? '' : String(u.roles_id),
          branch_id: u?.branch_id === null || u?.branch_id === undefined ? '' : String(u.branch_id),
          yearly_leave_allowance:
            u?.yearly_leave_allowance === null || u?.yearly_leave_allowance === undefined
              ? '0'
              : String(u.yearly_leave_allowance),
        };

        setInitialForm(next);
        setForm(next);
      } catch (err) {
        setError(err?.message || 'Failed to load');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [navigate, userId, location]);

  useEffect(() => {
    if (!success) return;

    const t = setTimeout(() => {
      setSuccess(null);
      if (alertRef.current) alertRef.current.style.display = 'none';
    }, 4000);

    return () => clearTimeout(t);
  }, [success]);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword((v) => !v);
  const handleToggleConPassword = () => setShowConPassword((v) => !v);

  const handleReset = () => {
    if (!initialForm) return;
    setError(null);
    setSuccess(null);
    setForm(initialForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setIsSaving(false);
      navigate('/', { replace: true });
      return;
    }

    if (!form.name || !form.email || !form.mobile) {
      setIsSaving(false);
      setError('Name, email, and mobile are required.');
      return;
    }

    if (form.password && form.password !== form.password_confirmation) {
      setIsSaving(false);
      setError('Password confirmation does not match.');
      return;
    }

    const payload = {
      name: form.name,
      email: form.email,
      mobile: form.mobile,
      gender: form.gender || null,
      roles_id: form.roles_id === '' ? null : Number(form.roles_id),
      branch_id: form.branch_id === '' ? null : Number(form.branch_id),
      yearly_leave_allowance: form.yearly_leave_allowance,
    };

    if (form.password) {
      payload.password = form.password;
      payload.password_confirmation = form.password_confirmation;
    }

    try {
      const res = await fetch(`/api/users/${encodeURIComponent(userId)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Failed to update user');

      setSuccess('User updated successfully.');

      const next = {
        ...form,
        password: '',
        password_confirmation: '',
      };
      setInitialForm({ ...next });
      setForm(next);

      if (alertRef.current) alertRef.current.style.display = 'block';
    } catch (err) {
      setError(err?.message || 'Failed to update user');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col flex-grow min-h-screen" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
        {/* Main Content */}
        <div className="flex flex-col flex-grow">
          {/* Breadcrumbs */}
          <div className="px-12 py-5 max-sm:px-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <p className="inline-flex items-center text-sm font-medium text-gray-700 text-nowrap">
                    <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Main Panel
                  </p>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2 text-nowrap">Users</p>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2 text-nowrap">Update User</p>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          {/* Main Panel */}
          <div className="p-6">
            <div className="flex flex-col flex-grow h-full p-6 border-2 rounded-lg">
              {isLoading ? (
                <div className="py-10 text-center text-gray-600">Loading...</div>
              ) : (
                <form onSubmit={handleSubmit} autoComplete="off">
                  {!!error && (
                    <div className="relative px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded" role="alert">
                      <span className="block sm:inline">{error}</span>
                    </div>
                  )}
                  {!!success && (
                    <div ref={alertRef} className="relative px-4 py-3 mb-4 text-green-700 bg-green-100 border border-green-400 rounded" role="alert">
                      <span className="block sm:inline">{success}</span>
                    </div>
                  )}
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-black ">Name</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={(e) => setField('name', e.target.value)}
                      className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Enter name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="Mobile_Number" className="block mb-2 text-sm font-medium text-black">Mobile Number</label>
                    <input
                      id="Mobile_Number"
                      name="mobile"
                      type="text"
                      value={form.mobile}
                      onChange={(e) => setField('mobile', e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Enter mobile number"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-3">
                  <div>
                    <label htmlFor="gender" className="block mb-2 text-sm font-medium text-black ">Gender</label>
                    <div className="w-full">
                      <select
                        id="gender"
                        name="gender"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={form.gender}
                        onChange={(e) => setField('gender', e.target.value)}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-black ">User Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={(e) => setField('email', e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Enter user email"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-black ">Password</label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={form.password}
                        onChange={(e) => setField('password', e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter password"
                      />
                      <button type="button" id="togglePassword" onClick={handleTogglePassword} className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-blue-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          {showPassword ? (
                            <>
                              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                              <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                            </>
                          ) : (
                            <>
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                            </>
                          )}
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="con_password" className="block mb-2 text-sm font-medium text-black ">Confirm Password</label>
                    <div className="relative">
                      <input
                        id="con_password"
                        type={showConPassword ? 'text' : 'password'}
                        name="password_confirmation"
                        value={form.password_confirmation}
                        onChange={(e) => setField('password_confirmation', e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Confirm password"
                      />
                      <button type="button" id="toggleConPassword" onClick={handleToggleConPassword} className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-blue-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          {showConPassword ? (
                            <>
                              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                              <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                            </>
                          ) : (
                            <>
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                            </>
                          )}
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <div className="md:col-span-2">
                      <label htmlFor="role" className="block mb-2 text-sm font-medium text-black">Role</label>
                      <select
                        id="role"
                        name="roles_id"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={form.roles_id}
                        onChange={(e) => setField('roles_id', e.target.value)}
                      >
                        <option value="">Select Role</option>
                        {roles.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.role_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <div className="md:col-span-2">
                      <label htmlFor="branch_id" className="block mb-2 text-sm font-medium text-black">Branch</label>
                      <select
                        id="branch_id"
                        name="branch_id"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={form.branch_id}
                        onChange={(e) => setField('branch_id', e.target.value)}
                      >
                        <option value="">Choose a Branch</option>
                        {branches.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="yearly_leave_allowance" className="block mb-2 text-sm font-medium text-black">Yearly Leave Days <span className="text-xs text-gray-500">(For monthly salary employees only)</span></label>
                    <input
                      id="yearly_leave_allowance"
                      type="number"
                      step="1"
                      min="0"
                      name="yearly_leave_allowance"
                      value={form.yearly_leave_allowance}
                      onChange={(e) => setField('yearly_leave_allowance', e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="0"
                    />
                    <p className="mt-1 text-xs text-gray-500">Number of paid leave days per year (without No Pay deductions)</p>
                  </div>
                </div>
                <div className="flex items-center justify-center w-full gap-4 max-sm:flex-col max-sm:p-0">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="py-3 px-6 bg-[#3c8c2c] text-white rounded-lg max-sm:py-1 max-sm:px-3 max-sm:w-full disabled:opacity-70"
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={!initialForm || isSaving}
                    className="px-6 py-3 text-white bg-[#3c8c2c] rounded-lg max-sm:py-1 max-sm:px-3 max-sm:w-full disabled:opacity-70"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    className="px-6 py-3 text-white bg-red-600 rounded-lg max-sm:py-1 max-sm:px-3 max-sm:w-full"
                    onClick={() => navigate('/users/user_list')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
              )}
            </div>
          </div>
          {/* Layout provides the footer, so no extra footer here */}
        </div>
      </div>
    </Layout>
  );
};

export default EditUsers;