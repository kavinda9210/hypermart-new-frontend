import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import './ViewRelatedStock.css';

const stockRows = [
  {
    id: 2,
    code: '1001',
    name: 'test',
    batch: '199',
    qty: 10000,
    remaining: 10000.0,
    purchase: '1,200.00',
    retail: '1,500.00',
    wholesale: '1,300.00',
    supplier: '—',
    invoice: '—',
    expiry: '—',
    received: 'Mar 25, 2026 00:02',
    note: 'test',
  },
  {
    id: 1,
    code: '1001',
    name: 'test',
    batch: '—',
    qty: 10000,
    remaining: 10000.0,
    purchase: '1,000.00',
    retail: '1,000.00',
    wholesale: '10,000.00',
    supplier: '—',
    invoice: '—',
    expiry: 'Mar 26, 2026',
    received: 'Mar 24, 2026 23:53',
    note: 'Initial stock added for new item.',
  },
];

const ViewRelatedStock = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const openRemoveStockModal = (row) => {
    setModalData({
      stock_update_id: row.id,
      item_name: row.name,
      batch_no: row.batch,
      remaining_stock: row.remaining,
    });
    setModalOpen(true);
  };
  const closeRemoveStockModal = () => setModalOpen(false);

  return (
    <Layout>
      <div className="min-h-dvh max-lg:h-fit flex flex-col h-fit bg-white">
       
        {/* Breadcrumbs */}
        <div className="px-6 lg:px-12 py-5 max-sm:px-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <p className="inline-flex items-center text-sm font-medium text-gray-700">
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
                  <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Stock</p>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                  <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">View Related Stock</p>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        {/* Main Panel */}
        <div className="px-6 lg:px-12">
          <div className="flex flex-col flex-grow pb-5 overflow-y-auto bg-white max-lg:min-h-full">
            <h1 className="text-3xl font-semibold mb-5">All Related Stocks</h1>
            <span></span>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
                <thead className="text-xs text-white uppercase bg-[#3c8c2c]">
                  <tr>
                    <th className="px-6 py-3 rounded-tl-lg">#</th>
                    <th className="px-6 py-3">Item Code</th>
                    <th className="px-6 py-3">Item Name</th>
                    <th className="px-6 py-3">Batch No</th>
                    <th className="px-6 py-3">Batch Qty</th>
                    <th className="px-6 py-3">Remaining</th>
                    <th className="px-6 py-3">Purchase Price</th>
                    <th className="px-6 py-3">Retail Price</th>
                    <th className="px-6 py-3">Wholesale Price</th>
                    <th className="px-6 py-3">Supplier</th>
                    <th className="px-6 py-3">Invoice Ref</th>
                    <th className="px-6 py-3">Expiry Date</th>
                    <th className="px-6 py-3">Received At</th>
                    <th className="px-6 py-3">Note</th>
                    <th className="px-6 py-3 rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stockRows.map((row, idx) => (
                    <tr key={row.id} className="text-black bg-white border-2">
                      <td className="px-6 py-4 font-medium whitespace-nowrap">{idx + 1}</td>
                      <td className="px-6 py-4">{row.code}</td>
                      <td className="px-6 py-4">{row.name}</td>
                      <td className="px-6 py-4">{row.batch}</td>
                      <td className="px-6 py-4">{row.qty}</td>
                      <td className="px-6 py-4"><span className="text-green-700 font-semibold">{row.remaining.toFixed(2)}</span></td>
                      <td className="px-6 py-4">{row.purchase}</td>
                      <td className="px-6 py-4 font-semibold text-blue-700">{row.retail}</td>
                      <td className="px-6 py-4">{row.wholesale}</td>
                      <td className="px-6 py-4">{row.supplier}</td>
                      <td className="px-6 py-4">{row.invoice}</td>
                      <td className="px-6 py-4">{row.expiry}</td>
                      <td className="px-6 py-4">{row.received}</td>
                      <td className="px-6 py-4">{row.note}</td>
                      <td className="px-6 py-4">
                        <button
                          className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 focus:ring-2 focus:ring-red-500"
                          onClick={() => openRemoveStockModal(row)}
                        >
                          Remove Stock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Remove Stock Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={closeRemoveStockModal}>
            <div className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Remove Stock</h3>
                <button onClick={closeRemoveStockModal} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
              <form>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Item:</strong> <span>{modalData.item_name}</span><br />
                    <strong>Batch:</strong> <span>{modalData.batch_no || 'N/A'}</span><br />
                    <strong>Available:</strong> <span className="font-semibold text-green-600">{modalData.remaining_stock}</span>
                  </p>
                </div>
                <div className="mb-4">
                  <label htmlFor="quantity_removed" className="block mb-2 text-sm font-medium text-gray-900">
                    Quantity to Remove <span className="text-red-600">*</span>
                  </label>
                  <input type="number" name="quantity_removed" id="quantity_removed" step="0.01" min="0.01"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter quantity" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="removal_reason" className="block mb-2 text-sm font-medium text-gray-900">
                    Reason for Removal <span className="text-red-600">*</span>
                  </label>
                  <select name="removal_reason" id="removal_reason"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required>
                    <option value="">Select reason...</option>
                    <option value="expired">Expired</option>
                    <option value="damaged">Damaged</option>
                    <option value="lost">Lost</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900">
                    Notes (Optional)
                  </label>
                  <textarea name="notes" id="notes" rows="3"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Add any additional details..."></textarea>
                </div>
                <div className="flex items-center justify-end space-x-3">
                  <button type="button" onClick={closeRemoveStockModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-300">
                    Cancel
                  </button>
                  <button type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500">
                    Remove Stock
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Footer */}
       
      </div>
    </Layout>
  );
};

export default ViewRelatedStock;