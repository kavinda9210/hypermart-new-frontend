import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerInvoice.css';

const mockInvoices = [
  {
    id: 3,
    code: '20260410002',
    customer: 'Customer',
    total: '11,000.00',
    vat: false,
    method: 'Debit Bill',
    status: 'Paid',
    assigned: true,
  },
  {
    id: 2,
    code: '20260410001',
    customer: 'BANDULA',
    total: '3,300.00',
    vat: false,
    method: 'Debit Bill',
    status: 'Paid',
    assigned: true,
  },
];

const CustomerInvoice = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalInvoice, setModalInvoice] = useState(null);

  const handleViewPayments = (invoice) => {
    setModalInvoice(invoice);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalInvoice(null);
  };

  return (
    <div className="customer-invoice-page flex flex-col h-full">
      {/* Breadcrumb */}
      <div className="w-full px-4 py-5 sm:px-6 lg:px-12">
        <nav aria-label="Breadcrumb" className="flex">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <button onClick={() => navigate('/dashboard')} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                <svg className="w-3 h-3 mr-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Main Panel
              </button>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 mx-1 text-gray-400" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <span className="text-sm font-medium text-gray-700 hover:text-blue-600 ms-1 md:ms-2">Customers</span>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 mx-1 text-gray-400" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <span className="text-sm font-medium text-gray-700 hover:text-blue-600 ms-1 md:ms-2">Customer Invoices</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="flex-1 px-4 pb-6 overflow-auto sm:px-6 lg:px-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Customer Invoices (Credit Bills, Debit Bills, VAT Invoices)</h1>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-white rounded-lg bg-yellow-500 hover:opacity-90 flex items-center gap-2">
              <i className="fas fa-money-check"></i>
              View Cheques
            </button>
            <button className="px-4 py-2 text-white rounded-lg bg-[#3c8c2c] hover:opacity-90 flex items-center gap-2">
              <i className="fas fa-plus"></i>
              Add New Invoice
            </button>
          </div>
        </div>
        {/* Filter VAT Report (PDF) */}
        <div className="p-6 mb-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            <i className="fas fa-filter mr-2"></i>Filter VAT Report (PDF)
          </h3>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">From Date</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">To Date</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="md:col-span-4 flex items-end justify-end">
              <button type="submit" className="px-4 py-2 text-white rounded-lg bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Generate Report (PDF)
              </button>
            </div>
          </form>
        </div>
        {/* Filter Invoices */}
        <div className="p-6 mb-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            <i className="fas fa-filter mr-2"></i>Filter Invoices
          </h3>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Search Customer</label>
              <input type="text" placeholder="Customer name..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Invoice Code</label>
              <input type="text" placeholder="Invoice code..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Payment Status</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Statuses</option>
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">VAT Status</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Invoices</option>
                <option value="vat">VAT Enabled</option>
                <option value="no_vat">No VAT</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">From Date</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">To Date</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Min Amount</label>
              <input type="number" placeholder="0.00" step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Max Amount</label>
              <input type="number" placeholder="0.00" step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="flex items-end space-x-2 md:col-span-4">
              <button type="submit" className="px-6 py-2 text-white rounded-lg bg-[#3c8c2c] hover:opacity-90">
                <i className="mr-2 fas fa-filter"></i>Apply Filters
              </button>
              <button type="button" className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                <i className="mr-2 fas fa-redo"></i>Reset
              </button>
            </div>
          </form>
        </div>
        {/* Invoice Table */}
        <div className="overflow-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="text-xs text-white uppercase bg-[#3c8c2c]">
              <tr>
                <th className="px-4 py-2">Invoice Code</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">VAT Enabled</th>
                <th className="px-4 py-2">Payment Method</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{invoice.code}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{invoice.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{invoice.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      <i className="fas fa-times"></i> No VAT
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {invoice.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {invoice.status}
                    </span>
                    <p className="text-xs ml-2"> assigned</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium flex justify-end">
                    <div className="flex flex-wrap gap-3 max-w-md lg:max-w-lg justify-end">
                      <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600" title="Assign Vehicle">
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button onClick={() => handleViewPayments(invoice)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded-md text-xs" title="View Payment Records">
                        <i className="fas fa-receipt"></i> Payments
                      </button>
                      <button className="bg-rose-600 hover:bg-rose-700 text-white px-2 py-1 rounded-md text-xs" title="Reverse Payments">
                        <i className="fas fa-undo-alt"></i> Reverse Payments
                      </button>
                      <button className="bg-[#3c8c2c] text-white px-2 py-1 rounded-md" title="View Invoice">
                        View Invoice
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4"></div>
        </div>
      </div>
      {/* Payment Records Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl z-10 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-indigo-600 text-white">
              <div>
                <h2 className="text-lg font-bold">Payment Records</h2>
                <p className="text-indigo-200 text-xs mt-0.5">{modalInvoice?.code}</p>
              </div>
              <button onClick={closeModal} className="text-white hover:text-indigo-200 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-px bg-gray-200">
              <div className="bg-blue-50 px-4 py-3 text-center">
                <p className="text-xs text-blue-500 uppercase font-medium">Invoice Total</p>
                <p className="text-xl font-bold text-blue-900">-</p>
              </div>
              <div className="bg-green-50 px-4 py-3 text-center">
                <p className="text-xs text-green-500 uppercase font-medium">Paid Amount</p>
                <p className="text-xl font-bold text-green-900">-</p>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="text-xs uppercase font-medium text-gray-500">Status</p>
                <p className="text-xl font-bold">-</p>
              </div>
            </div>
            <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
              <div className="py-12 text-center text-gray-400">
                <i className="fas fa-receipt text-4xl mb-3 block"></i>
                <p>No payment records found for this invoice.</p>
              </div>
            </div>
            <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 opacity-50 cursor-not-allowed" disabled>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print
              </button>
              <button onClick={closeModal} className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerInvoice;
