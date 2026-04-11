import React, { useState } from 'react';
import '../CreateCheques.css';

const CreateCheques = () => {
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const hideLoading = () => setLoading(false);
    hideLoading();
    document.addEventListener('visibilitychange', hideLoading);
    return () => document.removeEventListener('visibilitychange', hideLoading);
  }, []);

  const showLoading = () => setLoading(true);
  const handleNav = (url) => {
    showLoading();
    setTimeout(() => {
      setLoading(false);
      window.location.href = url;
    }, 800);
  };

  return (
    <div className="min-h-dvh max-lg:h-fit flex flex-col h-dvh">
      {/* Nav */}
      <div className="nav bg-[#3c8c2c] w-full h-[10%] max-lg:h-[17dvh] py-6 flex justify-between items-center max-md:justify-center max-md:flex-col md:px-14 lg:px-0">
        <span className="flex items-center gap-3 ml-20 max-lg:ml-0 max-sm:scale-75">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-full w-[50px] aspect-square bg-white flex justify-center items-center hover:scale-90 transition-all"
          >
            <i className="text-xl text-[#000000] fas fa-arrow-left"></i>
          </button>
          <button
            type="button"
            onClick={() => handleNav('/dashboard')}
            className="p-2 text-[#000000] rounded-lg bg-white flex gap-3 justify-center items-center hover:scale-90 transition-all"
          >
            <i className="text-xl text-[#000000] fas fa-city"></i>
            Go to Main Panel
          </button>
          <a
            href="/sales/billing"
            className="p-2 text-[#000000] rounded-lg bg-white flex gap-3 justify-center items-center hover:scale-90 transition-all"
          >
            POS
          </a>
        </span>
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:block">
          <img
            src="https://hypermart-new.onlinesytems.com/Company Logo/1774375149_1771770442_Screenshot 2026-02-22 195640.png"
            alt="Logo"
            className="h-14 max-sm:h-8 bg-white p-1 rounded-full"
          />
        </div>
        <span className="flex items-center gap-3 mr-20 max-lg:mr-0 max-sm:scale-75">
          <div className="flex flex-col items-end text-right">
            <h3 className="text-2xl max-md:text-sm text-[#ffffff]">Good Afternoon!</h3>
            <h3 className="text-sm text-[#ffffff]">Welcome HYPERMART</h3>
          </div>
          <form method="POST" action="https://hypermart-new.onlinesytems.com/logout">
            <input type="hidden" name="_token" value="w60AGsOgpzTar61Q5IStjmzQHtGFA4bgGu0ewCzn" autoComplete="off" />
            <button type="submit" className="rounded-full w-[50px] aspect-square bg-white flex justify-center items-center hover:scale-90 transition-all">
              <i className="text-xl font-bold text-[#000000] fas fa-sign-out-alt"></i>
            </button>
          </form>
        </span>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="text-center">
            <div className="spinner"></div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 px-4 pb-6 sm:px-6 lg:px-12">
        <div className="w-full py-5">
          <nav aria-label="Breadcrumb" className="flex">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <a href="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                  <svg className="w-3 h-3 mr-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V18a2 2 0 002 2h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a2 2 0 002-2v-7.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Main Panel
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 mx-1 text-gray-400" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                  <a href="/cheques" className="text-sm font-medium text-gray-700 hover:text-blue-600 ms-1 md:ms-2">Customer Cheques</a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 mx-1 text-gray-400" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                  <span className="text-sm font-semibold text-blue-600 ms-1">Add New Cheque</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Cheque</h2>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Cheque Number</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter cheque number" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Customer Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter customer name" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Bank Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter bank name" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Amount</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" step="0.01" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Cheque Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Clearance Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">VAT Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="">Select VAT Status</option>
                    <option value="vat">VAT Enabled</option>
                    <option value="no_vat">No VAT</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Replacement Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="">Select Replacement Status</option>
                    <option value="yes">Has Replacement</option>
                    <option value="no">No Replacement</option>
                    <option value="is_replacement">Is Replacement</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6 justify-end">
                <button type="submit" className="px-6 py-2 text-white rounded-lg bg-[#3c8c2c] hover:opacity-90">Add Cheque</button>
                <a href="/cheques" className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</a>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer className="bg-[#3c8c2c] py-4 text-center text-[#ffffff] mt-8">
        <p>2026 © All Rights Reserved | Hypermart | Designed and Developed by Silicon Radon Networks (Pvt) Ltd</p>
      </footer>
    </div>
  );
};

export default CreateCheques;
