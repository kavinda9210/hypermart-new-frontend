
import React, { useState, useEffect } from 'react';
import './CreateCheques.css';
import Layout from '../../../components/Layout';

const customers = [
  { id: '1', customer_name: 'Customer', contact_number: '1234567890', current_balance: '0.00' },
  { id: '7db14cc2-3519-4bc1-b281-32562caa3309', customer_name: 'BANDULA', contact_number: '0777608679', current_balance: '4600.00' },
];

const CreateCheques = () => {
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [manualAmount, setManualAmount] = useState('');
  const [chequeNotes, setChequeNotes] = useState('');
  const [vatEnabled, setVatEnabled] = useState(false);
  const [vatPercentage, setVatPercentage] = useState('');
  const [vatAmount, setVatAmount] = useState(0);
  const [customDatetime, setCustomDatetime] = useState('');

  useEffect(() => {
    const hideLoading = () => setLoading(false);
    hideLoading();
    document.addEventListener('visibilitychange', hideLoading);
    return () => document.removeEventListener('visibilitychange', hideLoading);
  }, []);

  useEffect(() => {
    // VAT calculation
    if (vatEnabled && vatPercentage && manualAmount) {
      const pct = parseFloat(vatPercentage) || 0;
      const total = parseFloat(manualAmount) || 0;
      let vatAmt = 0;
      if (pct > 0) {
        vatAmt = total - (total / (1 + pct / 100));
      }
      setVatAmount(vatAmt);
    } else {
      setVatAmount(0);
    }
  }, [vatEnabled, vatPercentage, manualAmount]);

  const showLoading = () => setLoading(true);
  const handleNav = (url) => {
    showLoading();
    setTimeout(() => {
      setLoading(false);
      window.location.href = url;
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showLoading();
    setTimeout(() => {
      setLoading(false);
      // Simulate form submission
      window.location.href = '/cheques';
    }, 1200);
  };

  return (
        <Layout>
    
      {/* Nav */}
      

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="text-center">
            <div className="spinner"></div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        <div className="px-4 py-4 sm:px-6 lg:px-12">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <li className="inline-flex items-center">
                <a href="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                  <svg className="w-4 h-4 me-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V18a2 2 0 002 2h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a2 2 0 002-2v-7.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Main Panel
                </a>
              </li>
              <li className="inline-flex items-center">
                <svg className="w-4 h-4 mx-1 text-gray-400" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/></svg>
                <a href="/cheques" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">Customer Cheques</a>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mx-1 text-gray-400" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/></svg>
                  <p className="text-sm font-semibold text-blue-600 ms-1">Add New Cheque</p>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="px-4 pb-8 sm:px-6 lg:px-12">
          <h2 className="text-xl font-bold mb-4">Add New Cheque</h2>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md" autoComplete="off">
            {/* Customer */}
            <div className="mb-4 custom-select">
              <label className="block font-medium mb-1">Customer *</label>
              <select
                name="customer_id"
                id="customer_id"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                value={customerId}
                onChange={e => setCustomerId(e.target.value)}
              >
                <option value="">Select Customer</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.customer_name} ({c.contact_number}) - Rs. {parseFloat(c.current_balance).toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            {/* Manual Amount */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Amount *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                name="manual_amount"
                id="manual_amount"
                value={manualAmount}
                onChange={e => setManualAmount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter cheque amount"
                required
              />
            </div>
            <input type="hidden" name="total_amount" id="total_amount" value={manualAmount} />

            {/* Cheque Details */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-blue-900 mb-3">Cheque Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1 text-sm">Bank Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Enter bank name" />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-sm">Cheque Number</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Enter cheque number" />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-sm">Cheque Date</label>
                  <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-sm">Clearance Date</label>
                  <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div className="mt-3">
                <label className="block font-medium mb-1 text-sm">Notes</label>
                <textarea
                  name="cheque_notes"
                  id="cheque_notes"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter notes"
                  value={chequeNotes}
                  onChange={e => setChequeNotes(e.target.value)}
                ></textarea>
              </div>
            </div>

            {/* VAT (hidden by default) */}
            <div className="mb-3 flex items-center gap-3">
              <label htmlFor="vat_enabled">VAT Enabled?</label>
              <input
                type="checkbox"
                name="vat_enabled"
                id="vat_enabled"
                checked={vatEnabled}
                onChange={e => setVatEnabled(e.target.checked)}
                value="1"
              />
            </div>
            {vatEnabled && (
              <div id="vat_fields" className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-purple-900 mb-3">VAT Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium mb-1 text-sm">VAT Percentage</label>
                    <input
                      type="number"
                      id="vat_percentage"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      value={vatPercentage}
                      onChange={e => setVatPercentage(e.target.value)}
                      placeholder="Enter VAT %"
                    />
                  </div>
                  <div className="flex items-center h-full">
                    <span id="vat_amount_display" className="text-blue-900 font-semibold">
                      VAT Amount: Rs. {vatAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Custom Datetime for Super Admin */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl border-2 border-yellow-300 mb-4">
              <label htmlFor="custom_datetime" className="block mb-2 text-sm font-semibold text-gray-900">
                <i className="mr-2 text-yellow-600 fas fa-calendar-alt"></i>Custom Date &amp; Time
                <span className="text-xs text-gray-600 font-normal">(Super Admin Only - Optional)</span>
              </label>
              <input
                type="datetime-local"
                name="custom_datetime"
                id="custom_datetime"
                className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                value={customDatetime}
                onChange={e => setCustomDatetime(e.target.value)}
              />
              <p className="mt-2 text-xs text-gray-600">
                <i className="mr-1 fas fa-info-circle text-yellow-600"></i>Leave empty to use current time.
              </p>
            </div>

            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              <i className="fas fa-save mr-2"></i>Create Cheque
            </button>
            <a href="/cheques" className="ml-3 text-gray-600 hover:text-gray-800">Cancel</a>
          </form>
        </div>
      </div>

      </Layout>
  );
};

export default CreateCheques;
