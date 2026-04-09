
import React from 'react';
import './AddUsers.css';
import Layout from '../../../components/Layout';
import { useNavigate } from 'react-router-dom';

const AddUsers = () => {
  const navigate = useNavigate();

  // Handler for cancel button
  const handleCancel = () => {
    navigate('/users/users');
  };

  return (
    <Layout>
      {/* Loading Overlay (hidden by default, can be implemented with state if needed) */}
      <div id="loading-overlay" className="loading-overlay" style={{ display: 'none' }}>
        <div className="text-center">
          <div className="spinner"></div>
        </div>
      </div>

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
                  <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2 text-nowrap">Add New User</p>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        {/* Main panel */}
        <div className="p-6">
          <div className="flex flex-col flex-grow h-full p-6 border-2 rounded-lg bg-white">
            <form className="w-full">
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-black ">Name</label>
                  <input id="name" type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter name" required />
                </div>
                <div>
                  <label htmlFor="Mobile_Number" className="block mb-2 text-sm font-medium text-black">Mobile Number</label>
                  <input id="Mobile_Number" name="Mobile_Number" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter mobile number" required />
                </div>
              </div>
              <div className="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                  <label htmlFor="gender" className="block mb-2 text-sm font-medium text-black ">Gender</label>
                  <div className="w-full">
                    <select id="gender" name="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-black ">User Email</label>
                  <input id="email" type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter user email" required />
                </div>
              </div>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-black ">Password</label>
                  <input id="password" type="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter password" required />
                </div>
                <div>
                  <label htmlFor="con_password" className="block mb-2 text-sm font-medium text-black ">Confirm Password</label>
                  <input id="con_password" type="password" name="password_confirmation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Confirm password" required />
                </div>
              </div>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <div className="md:col-span-2">
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-black">Role</label>
                    <select id="role" name="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                      <option value="">Select Role</option>
                      <option value="1">admin</option>
                      <option value="2">manager</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div className="md:col-span-2">
                    <label htmlFor="branch_id" className="block mb-2 text-sm font-medium text-black">Select Branch</label>
                    <select id="branch_id" name="branch_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                      <option value="">Choose a Branch</option>
                      <option value="1">Kandy</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label htmlFor="yearly_leave_allowance" className="block mb-2 text-sm font-medium text-black">
                    Yearly Leave Days
                    <span className="text-xs text-gray-500">(For monthly salary employees only)</span>
                  </label>
                  <input id="yearly_leave_allowance" type="number" step="1" min="0" name="yearly_leave_allowance" defaultValue="0" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="0" />
                  <p className="mt-1 text-xs text-gray-500">Number of paid leave days per year (without No Pay deductions)</p>
                </div>
              </div>
              <div id="message"></div>
              <div className="flex items-center justify-center w-full gap-4 max-sm:flex-col max-sm:p-0">
                <button type="submit" className="py-3 px-6 bg-[#3c8c2c] text-white rounded-lg max-sm:py-1 max-sm:px-3 max-sm:w-full ">Add</button>
                <button type="reset" className="px-6 py-3 text-white bg-[#3c8c2c] rounded-lg max-sm:py-1 max-sm:px-3 max-sm:w-full">Reset</button>
                <button type="button" className="px-6 py-3 text-white bg-red-600 rounded-lg max-sm:py-1 max-sm:px-3 max-sm:w-full" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex-grow"></div>
        
      </div>
    </Layout>
  );
};

export default AddUsers;