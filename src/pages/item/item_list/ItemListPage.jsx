import React from 'react';
import Layout from '../../../components/Layout';
import './ItemListPage.css';

const ItemListPage = () => {
  // Placeholder for items data
  // In a real app, fetch items from API or state
  const items = [];

  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Breadcrumbs */}
        <div className="px-12 py-1 max-sm:px-6">
          <nav className="flex justify-between w-full" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <span className="inline-flex items-center text-sm font-medium text-gray-700">
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
                  <span className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Items</span>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Items List</span>
                </div>
              </li>
            </ol>
            {/* Right side buttons (hidden for now) */}
            <span className="w-fit max-md:w-full max-md:justify-center flex gap-3 max-sm:gap-1 max-[350px]:scale-75">
              <button className="hidden px-2 py-1.5 text-white bg-[#3c8c2c] rounded-lg max-sm:px-2 max-sm:py-1">Copy</button>
              <button className="hidden px-2 py-3 text-white bg-[#3c8c2c] rounded-lg max-sm:px-2 max-sm:py-1">CSV</button>
              <button className="hidden px-2 py-1.5 text-white bg-[#3c8c2c] rounded-lg max-sm:px-2 max-sm:py-1">Excel</button>
              <button className="hidden px-2 py-1.5 text-white bg-[#3c8c2c] rounded-lg max-sm:px-2 max-sm:py-1">PDF</button>
              <button type="button" className="px-2 py-3 text-white bg-[#3c8c2c] rounded-lg max-sm:px-2 max-sm:py-1">Column Visibility</button>
            </span>
          </nav>
        </div>

        {/* Search and Sort */}
        <div className="flex max-md:flex-col items-center justify-between w-full gap-3 px-12 py-3 max-sm:px-6">
          <div className="flex max-sm:flex-wrap items-center w-fit gap-3 max-md:w-full">
            <label htmlFor="search_item" className="text-xs">Search</label>
            <input type="text" name="search" id="searchItemName" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg md:p-3 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter item name" />
            <button className="py-2 md:py-3 px-4 md:px-6 bg-[#3c8c2c] text-white rounded-lg text-sm md:text-base">Search</button>
            <button className="py-2 md:py-3 px-4 md:px-6 bg-[#3c8c2c] text-white rounded-lg text-sm md:text-base">Reset</button>
          </div>
          <div className="flex items-center w-fit gap-3 max-md:w-full max-md:mt-2">
            <label htmlFor="sort_by" className="text-xs whitespace-nowrap">Sort by:</label>
            <select name="sort_by" id="sort_by" className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
              <option value="item_code">Item Code</option>
              <option value="item_name">Item Name</option>
              <option value="unit_type_id">Unit Type</option>
              <option value="status_id">Status</option>
            </select>
            <select name="sort_order" id="sort_order" className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="flex flex-col px-12 py-1 overflow-y-auto bg-white max-sm:px-6">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 rtl:text-right" id="itemsTable">
              <thead className="text-xs text-white uppercase bg-[#3c8c2c]">
                <tr>
                  <th className="px-4 py-2 rounded-tl-lg">Item Code</th>
                  <th className="px-4 py-2">Item image</th>
                  <th className="px-4 py-2">Item Name - (Singlish Name if any)</th>
                  <th className="px-4 py-2 text-right">Qty</th>
                  <th className="px-4 py-2">Unit Type</th>
                  <th className="hidden px-4 py-2">Item Code</th>
                  <th className="hidden px-4 py-2">Value ID</th>
                  <th className="hidden px-4 py-2">Min qty</th>
                  <th className="hidden px-4 py-2">Purchase price</th>
                  <th className="hidden px-4 py-2">Retail price</th>
                  <th className="hidden px-4 py-2">Wholesale price</th>
                  <th className="hidden px-4 py-2">Status id</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2 rounded-tr-lg">Manage</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="14" className="text-center py-8 text-gray-500">No items in the list</td>
                  </tr>
                ) : (
                  items.map((item, idx) => (
                    <tr key={item.id}>
                      <td className="px-4 py-2">{item.item_code}</td>
                      <td className="px-4 py-2">{/* Item image here */}</td>
                      <td className="px-4 py-2">{item.item_name}</td>
                      <td className="px-4 py-2 text-right">{item.qty}</td>
                      <td className="px-4 py-2">{item.unit_type}</td>
                      <td className="hidden px-4 py-2">{item.item_code}</td>
                      <td className="hidden px-4 py-2">{item.value_id}</td>
                      <td className="hidden px-4 py-2">{item.min_qty}</td>
                      <td className="hidden px-4 py-2">{item.purchase_price}</td>
                      <td className="hidden px-4 py-2">{item.retail_price}</td>
                      <td className="hidden px-4 py-2">{item.wholesale_price}</td>
                      <td className="hidden px-4 py-2">{item.status_id}</td>
                      <td className="px-4 py-2">{item.status}</td>
                      <td className="px-4 py-2">{/* Manage buttons here */}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center p-1 mt-1 mb-6">
          <div className="pagination">
            <nav role="navigation" aria-label="Pagination Navigation" className="flex items-center justify-between">
              <div className="flex justify-between flex-1 sm:hidden">
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-500 bg-white border border-gray-300 rounded-md cursor-default">&laquo; Previous</span>
                <span className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium leading-5 text-gray-500 bg-white border border-gray-300 rounded-md cursor-default">Next &raquo;</span>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm leading-5 text-gray-700">
                    Showing <span className="font-medium">0</span> to <span className="font-medium">0</span> of <span className="font-medium">0</span> results
                  </p>
                </div>
                <div>
                  <span className="relative z-0 inline-flex rounded-md shadow-sm rtl:flex-row-reverse">
                    <span aria-disabled="true" aria-label="&laquo; Previous">
                      <span className="relative inline-flex items-center px-2 py-2 text-sm font-medium leading-5 text-gray-500 bg-white border border-gray-300 cursor-default rounded-l-md" aria-hidden="true">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </span>
                    <a className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-white bg-blue-600 border-blue-600 border cursor-default" aria-label="Go to page 1">1</a>
                    <span aria-disabled="true" aria-label="Next &raquo;">
                      <span className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium leading-5 text-gray-500 bg-white border border-gray-300 rounded-r-md cursor-default">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemListPage;
