import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import './DueAmount.css';

const mockTableData = [
  {
    invoice: 'INV-001',
    customer: 'Customer A',
    phone: '0712345678',
    item: 'Item 1',
    invoiceAmount: 1000,
    receivedAmount: 800,
    due: 200,
    createdBy: 'Admin',
    date: '2026-04-01',
  },
  {
    invoice: 'INV-002',
    customer: 'Customer B',
    phone: '0723456789',
    item: 'Item 2',
    invoiceAmount: 2000,
    receivedAmount: 1500,
    due: 500,
    createdBy: 'Admin',
    date: '2026-04-02',
  },
];

const DueAmount = () => {
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    customer: '',
    customerId: '',
    phone: '',
    itemCode: '',
    createdBy: '',
  });

  // Filter logic (static for now)
  const filteredData = mockTableData.filter(row =>
    (filters.customer === '' || row.customer.toLowerCase().includes(filters.customer.toLowerCase()))
  );

  // Totals
  const totalInvoice = filteredData.length;
  const totalInvoiceAmount = filteredData.reduce((sum, row) => sum + row.invoiceAmount, 0);
  const totalReceivedAmount = filteredData.reduce((sum, row) => sum + row.receivedAmount, 0);
  const totalSalesDue = filteredData.reduce((sum, row) => sum + row.due, 0);

  return (
    <Layout>
      <div className="flex flex-col h-[680px] max-lg:h-fit bg-gray-100">
        {/* Breadcrumbs */}
        <div className="px-12 py-5 max-sm:px-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <p className="inline-flex items-center text-sm font-medium text-gray-700">Main Panel</p>
              </li>
              <li>
                <div className="flex items-center">Sales</div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">Due Amount</div>
              </li>
            </ol>
          </nav>
        </div>
        {/* Submission controls (filters) */}
        <div className="px-12 max-sm:px-6">
          <form className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700">From Date</label>
              <input type="date" className="border rounded px-2 py-1" value={filters.fromDate} onChange={e => setFilters(f => ({ ...f, fromDate: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">To Date</label>
              <input type="date" className="border rounded px-2 py-1" value={filters.toDate} onChange={e => setFilters(f => ({ ...f, toDate: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer</label>
              <input type="text" className="border rounded px-2 py-1" value={filters.customer} onChange={e => setFilters(f => ({ ...f, customer: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer ID</label>
              <input type="text" className="border rounded px-2 py-1" value={filters.customerId} onChange={e => setFilters(f => ({ ...f, customerId: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="text" className="border rounded px-2 py-1" value={filters.phone} onChange={e => setFilters(f => ({ ...f, phone: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Item Code</label>
              <input type="text" className="border rounded px-2 py-1" value={filters.itemCode} onChange={e => setFilters(f => ({ ...f, itemCode: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Created By</label>
              <input type="text" className="border rounded px-2 py-1" value={filters.createdBy} onChange={e => setFilters(f => ({ ...f, createdBy: e.target.value }))} />
            </div>
            <button type="button" className="bg-[#3c8c2c] text-white px-4 py-2 rounded">Filter</button>
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setFilters({ fromDate: '', toDate: '', customer: '', customerId: '', phone: '', itemCode: '', createdBy: '' })}>Reset</button>
          </form>
        </div>
        {/* Table */}
        <div className="flex flex-col px-12 py-5 overflow-y-auto bg-white max-sm:px-6 max-lg:min-h-full">
          <span></span>
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right" id="salesListTable">
            <thead className="text-xs text-white uppercase bg-[#3c8c2c]">
              <tr>
                <th className="px-6 py-4">Invoice</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">Invoice Amount</th>
                <th className="px-6 py-4">Received Amount</th>
                <th className="px-6 py-4">Due</th>
                <th className="px-6 py-4">Created By</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4">{row.invoice}</td>
                  <td className="px-6 py-4">{row.customer}</td>
                  <td className="px-6 py-4">{row.phone}</td>
                  <td className="px-6 py-4">{row.item}</td>
                  <td className="px-6 py-4">{row.invoiceAmount.toFixed(2)}</td>
                  <td className="px-6 py-4">{row.receivedAmount.toFixed(2)}</td>
                  <td className="px-6 py-4">{row.due.toFixed(2)}</td>
                  <td className="px-6 py-4">{row.createdBy}</td>
                  <td className="px-6 py-4">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Summary */}
          <div className="mt-4 flex gap-8">
            <div>Total Invoice: <span id="total-invoice">{totalInvoice}</span></div>
            <div>Total Invoice Amount: <span id="total-invoice-amount">{totalInvoiceAmount.toFixed(2)}</span></div>
            <div>Total Received Amount: <span id="total-received-amount">{totalReceivedAmount.toFixed(2)}</span></div>
            <div>Total Sales Due: <span id="total-sales-due">{totalSalesDue.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DueAmount;