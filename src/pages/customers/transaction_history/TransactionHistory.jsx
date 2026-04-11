
import React, { useState, useRef } from 'react';
import './TransactionHistory.css';

const TransactionHistory = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('Transaction Details');

  // Customer dropdown state
  const customerOptions = [
    { value: '', label: 'All Customers' },
    { value: '7db14cc2-3519-4bc1-b281-32562caa3309', label: 'BANDULA' },
    { value: '1', label: 'Customer' },
  ];
  const [customerSearch, setCustomerSearch] = useState('');
  const [customerDropdownOpen, setCustomerDropdownOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(customerOptions[2].value);
  const dropdownRef = useRef(null);

  // Filtered options
  const filteredCustomers = customerOptions.filter(opt =>
    opt.label.toLowerCase().includes(customerSearch.toLowerCase())
  );

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCustomerDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  // Modal logic
  const openModal = (type, id) => {
    setModalOpen(true);
    setModalTitle('Transaction Details');
    setModalContent(
      <div className="flex items-center justify-center py-8">
        <svg className="w-8 h-8 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    );
    // Simulate fetch
    setTimeout(() => {
      setModalTitle('Transaction Details');
      setModalContent(
        <div className="p-4 text-center text-green-700">Transaction details loaded for type: {type}, id: {id}</div>
      );
    }, 1200);
  };
  const closeModal = () => setModalOpen(false);

  // Simulate navigation loading overlay
  const handleNav = (url) => {
    showLoading();
    setTimeout(() => {
      hideLoading();
      window.location.href = url;
    }, 800);
  };

  // Simulate form submit
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    showLoading();
    setTimeout(hideLoading, 1000);
  };

  return (
    <div className="transaction-history-root min-h-dvh max-lg:h-fit flex flex-col h-dvh">
      {/* Nav */}
      <div className="nav bg-[#3c8c2c] w-full h-[10%] max-lg:h-[17dvh] py-6 flex justify-between items-center max-md:justify-center max-md:flex-col md:px-14 lg:px-0">
        <span className="flex items-center gap-3 ml-20 max-lg:ml-0 max-sm:scale-75">
          <button type="button" onClick={() => window.history.back()} className="rounded-full w-[50px] aspect-square bg-white flex justify-center items-center hover:scale-90 transition-all">
            <i className="text-xl text-[#000000] fas fa-arrow-left"></i>
          </button>
          <button type="button" onClick={() => handleNav('/dashboard')} className="p-2 text-[#000000] rounded-lg bg-white flex gap-3 justify-center items-center hover:scale-90 transition-all">
            <i className="text-xl text-[#000000] fas fa-city"></i>
            Go to Main Panel
          </button>
          <a href="/sales/billing" className="p-2 text-[#000000] rounded-lg bg-white flex gap-3 justify-center items-center hover:scale-90 transition-all">POS</a>
        </span>
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:block">
          <img src="https://hypermart-new.onlinesytems.com/Company Logo/1774375149_1771770442_Screenshot 2026-02-22 195640.png" alt="Logo" className="h-14 max-sm:h-8 bg-white p-1 rounded-full" />
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex items-center justify-center" onClick={e => { if (e.target.classList.contains('fixed')) closeModal(); }}>
          <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-900">{modalTitle}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">{modalContent}</div>
            {/* Modal Footer */}
            <div className="flex justify-between items-center gap-3 p-4 border-t">
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 opacity-50 cursor-not-allowed">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print
              </a>
              <button onClick={closeModal} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:h-[90vh] flex-1">
        {/* Breadcrumbs */}
        <div className="w-full px-4 py-5 sm:px-6 lg:px-12">
          <nav aria-label="Breadcrumb" className="flex items-center justify-between max-md:flex-col">
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
                  <a href="/customers/customers" className="text-sm font-medium text-gray-700 hover:text-blue-600 ms-1 md:ms-2">Customers</a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 mx-1 text-gray-400" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                  <span className="text-sm font-medium text-gray-500 ms-1 md:ms-2">Customer Transactions History</span>
                </div>
              </li>
            </ol>
            <div className="flex gap-3">
              <a href="/customers/transactions" className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">+ New Transaction</a>
              <a href="/customers/transactions/history/pdf?customer_id=1" className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Export PDF
              </a>
            </div>
          </nav>
        </div>

        {/* Filters */}
        <div className="px-4 py-4 sm:px-6 lg:px-12">
          <form className="p-4 bg-white rounded-lg shadow" onSubmit={handleFilterSubmit} autoComplete="off">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="custom-select">
                <label className="block mb-2 text-sm font-medium text-gray-700">Customer</label>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-left bg-white"
                    onClick={() => setCustomerDropdownOpen((open) => !open)}
                  >
                    {customerOptions.find(opt => opt.value === selectedCustomer)?.label || 'Select customer'}
                  </button>
                  {customerDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                      <input
                        type="text"
                        className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none"
                        placeholder="Search customer..."
                        value={customerSearch}
                        onChange={e => setCustomerSearch(e.target.value)}
                        autoFocus
                      />
                      <ul className="max-h-48 overflow-y-auto">
                        {filteredCustomers.length === 0 && (
                          <li className="px-3 py-2 text-gray-400">No results</li>
                        )}
                        {filteredCustomers.map(opt => (
                          <li
                            key={opt.value}
                            className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${selectedCustomer === opt.value ? 'bg-blue-50 font-semibold' : ''}`}
                            onClick={() => {
                              setSelectedCustomer(opt.value);
                              setCustomerDropdownOpen(false);
                            }}
                          >
                            {opt.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Transaction Type</label>
                <select name="transaction_type" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg">
                  <option value="">All Types</option>
                  <option value="deposit">Customer Deposits</option>
                  <option value="invoice">Invoices (Credit Bills)</option>
                  <option value="cheque">Cheques</option>
                  <option value="oil_sale">Oil Sales</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">From Date</label>
                <input type="date" name="date_from" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">To Date</label>
                <input type="date" name="date_to" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Apply Filters</button>
              <a href="/customers/transactions/history" className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Clear Filters</a>
            </div>
          </form>
        </div>

        {/* Transactions Table & Summary */}
        <div className="flex-1 px-4 pb-6 md:overflow-auto sm:px-6 lg:px-12">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Transactions for Customer</h2>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Total Debits Card */}
              <div className="p-4 border-l-4 border-red-500 rounded-lg shadow-sm bg-red-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-red-600 uppercase">Total Debits</p>
                    <p className="mt-1 text-2xl font-bold text-red-700">Rs. 0.00</p>
                    <p className="mt-1 text-xs text-red-600">0 transactions</p>
                  </div>
                  <div className="p-3 bg-red-200 rounded-full">
                    <svg className="w-6 h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                  </div>
                </div>
              </div>
              {/* Total Credits Card */}
              <div className="p-4 border-l-4 border-green-500 rounded-lg shadow-sm bg-green-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-green-600 uppercase">Total Credits</p>
                    <p className="mt-1 text-2xl font-bold text-green-700">Rs. 14,350.00</p>
                    <p className="mt-1 text-xs text-green-600">3 transactions</p>
                  </div>
                  <div className="p-3 bg-green-200 rounded-full">
                    <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                  </div>
                </div>
              </div>
              {/* Net Balance Card */}
              <div className="p-4 border-l-4 border-blue-500 rounded-lg shadow-sm bg-blue-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-blue-600 uppercase">Net Balance</p>
                    <p className="mt-1 text-2xl font-bold text-blue-700">Credit Rs. 14,350.00</p>
                    <p className="mt-1 text-xs text-blue-600">From filtered transactions</p>
                  </div>
                  <div className="p-3 bg-blue-200 rounded-full">
                    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Current Balance Card */}
              <div className="p-4 border-l-4 border-yellow-500 rounded-lg shadow-sm bg-yellow-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-yellow-600 uppercase">Current Balance</p>
                    <p className="mt-1 text-2xl font-bold text-yellow-700">Debit Rs. 0.00</p>
                    <p className="mt-1 text-xs text-yellow-600">Customer</p>
                  </div>
                  <div className="p-3 bg-yellow-200 rounded-full">
                    <svg className="w-6 h-6 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Opening Balance Card */}
              <div className="p-4 border-l-4 border-purple-500 rounded-lg shadow-sm bg-purple-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-purple-600 uppercase">Opening Balance</p>
                    <p className="mt-1 text-2xl font-bold text-purple-700">Debit Rs. 0.00</p>
                    <p className="mt-1 text-xs text-purple-600">Customer</p>
                  </div>
                  <div className="p-3 bg-purple-200 rounded-full">
                    <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Transaction Type Breakdown */}
            <div className="grid grid-cols-2 gap-4 p-4 mb-6 border rounded-lg md:grid-cols-3 bg-gray-50">
              <div className="text-center">
                <p className="text-xs font-medium text-gray-600">Deposits</p>
                <p className="mt-1 text-lg font-bold text-green-700">Rs. 0.00</p>
                <p className="text-xs text-gray-500">0 items</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-gray-600">Invoices</p>
                <p className="mt-1 text-lg font-bold text-blue-700">Rs. 14,350.00</p>
                <p className="text-xs text-gray-500">3 items</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-gray-600">Oil Sales</p>
                <p className="mt-1 text-lg font-bold text-yellow-700">Rs. 0.00</p>
                <p className="text-xs text-gray-500">0 items</p>
              </div>
            </div>
            {/* Transactions Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 font-medium">#</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4 text-right">Debit</th>
                    <th className="px-6 py-4 text-right">Credit</th>
                    <th className="px-6 py-4">Ref</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">1</td>
                    <td className="px-6 py-4">06 Apr 2026 14:08</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">Invoice</span>
                    </td>
                    <td className="px-6 py-4">Customer</td>
                    <td className="px-6 py-4 capitalize">debit Bill -  [Paid]</td>
                    <td className="px-6 py-4 text-right text-red-600 font-medium"></td>
                    <td className="px-6 py-4 text-right text-green-600 font-medium">Rs. 1,200.00</td>
                    <td className="px-6 py-4">20260410003</td>
                    <td className="px-6 py-4 flex gap-2 flex-wrap items-center">
                      <button type="button" className="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700" onClick={() => openModal('customer_invoice', '4')}>View Details</button>
                    </td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">2</td>
                    <td className="px-6 py-4">01 Apr 2026 00:51</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">Invoice</span>
                    </td>
                    <td className="px-6 py-4">Customer</td>
                    <td className="px-6 py-4 capitalize">debit Bill -  [Paid]</td>
                    <td className="px-6 py-4 text-right text-red-600 font-medium"></td>
                    <td className="px-6 py-4 text-right text-green-600 font-medium">Rs. 11,000.00</td>
                    <td className="px-6 py-4">20260410002</td>
                    <td className="px-6 py-4 flex gap-2 flex-wrap items-center">
                      <button type="button" className="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700" onClick={() => openModal('customer_invoice', '3')}>View Details</button>
                    </td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">3</td>
                    <td className="px-6 py-4">31 Mar 2026 16:20</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">Invoice</span>
                    </td>
                    <td className="px-6 py-4">Customer</td>
                    <td className="px-6 py-4 capitalize">debit Bill -  [Paid]</td>
                    <td className="px-6 py-4 text-right text-red-600 font-medium"></td>
                    <td className="px-6 py-4 text-right text-green-600 font-medium">Rs. 2,150.00</td>
                    <td className="px-6 py-4">20260310001</td>
                    <td className="px-6 py-4 flex gap-2 flex-wrap items-center">
                      <button type="button" className="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700" onClick={() => openModal('customer_invoice', '1')}>View Details</button>
                    </td>
                  </tr>
                </tbody>
                <tfoot className="font-bold bg-gray-100">
                  <tr>
                    <td className="px-6 py-4 text-right" colSpan={5}>Totals:</td>
                    <td className="px-6 py-4 text-right text-red-600">Rs. 0.00</td>
                    <td className="px-6 py-4 text-right text-green-600">Rs. 14,350.00</td>
                    <td className="px-6 py-4" colSpan={2}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            {/* Pagination */}
            <div className="mt-4"></div>
          </div>
        </div>
      </div>

      <footer className="bg-[#3c8c2c] py-4 text-center text-[#ffffff]">
        <p>2026 © All Rights Reserved | Hypermart | Designed and Developed by Silicon Radon Networks (Pvt) Ltd</p>
      </footer>
    </div>
  );
};

export default TransactionHistory;