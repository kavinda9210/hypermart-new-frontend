import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/Layout';
import './SalesItem.css';

const SalesItem = () => {
  const navigate = useNavigate();
  const handleMore = () => {
    navigate('/sales/payment_details');
  };
  return (
    <Layout>
      {/* Loading Overlay (UI only) */}
      <div className="loading-overlay" style={{ display: 'none' }}>
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
                  <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Sales</p>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                  <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Sales List</p>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        {/* Filter/Search Form (UI only) */}
        <div className="px-12 max-sm:px-6">
          <form className="grid gap-6 py-6 md:grid-cols-6" onSubmit={e => e.preventDefault()}>
            <div className="custom-select">
              <label htmlFor="category_id" className="block mb-2 text-sm font-medium text-black">Category</label>
              <select name="category_id" id="category_id" className="hidden">
                <option value="">All Categories</option>
                <option value="1">sample category</option>
              </select>
            </div>
            <div>
              <label htmlFor="sales_code" className="block mb-2 text-sm font-medium text-black">Sales Code</label>
              <div className="w-full">
                <input id="sales_code" name="sales_code" type="text" className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter sales code" />
              </div>
            </div>
            <div>
              <label htmlFor="customer_name" className="block mb-2 text-sm font-medium text-black">Customer</label>
              <div className="w-full">
                <input id="customer_name" name="customer_name" type="text" className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter customer name" />
              </div>
            </div>
            <div>
              <label htmlFor="contact_number" className="block mb-2 text-sm font-medium text-black">Customer Contact</label>
              <div className="w-full">
                <input id="contact_number" name="contact_number" type="text" className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter contact number" />
              </div>
            </div>
            <div>
              <label htmlFor="batch_no" className="block mb-2 text-sm font-medium text-black">Batch No</label>
              <div className="w-full">
                <input id="batch_no" name="batch_no" type="text" className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter batch no" />
              </div>
            </div>
            <div className="hidden">
              <label htmlFor="item_code" className="block mb-2 text-sm font-medium text-black">Item code</label>
              <div className="w-full">
                <input id="item_code" type="number" className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter item code" />
              </div>
            </div>
            <div>
              <label htmlFor="from-date" className="block mb-2 text-sm font-medium text-black">From Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input id="from-date" name="from_date" type="date" className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Select a date" />
              </div>
            </div>
            <div>
              <label htmlFor="to-date" className="block mb-2 text-sm font-medium text-black">To Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input id="to-date" name="to_date" type="date" className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Select a date" />
              </div>
            </div>
          </form>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <button type="submit" className="py-3 px-6 bg-[#3c8c2c] text-white rounded-lg">Filter</button>
            <button type="button" className="py-3 px-6 bg-gray-500 text-white rounded-lg text-center">Clear Filters</button>
          </div>
        </div>
        {/* Table Section (UI only, static) */}
        <div className="flex flex-col px-12 py-5 overflow-y-auto bg-white max-sm:px-6 max-lg:min-h-full">
          <div className="relative h-[500px] overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
              <thead className="text-xs text-white uppercase bg-[#3c8c2c]">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-tl-lg">ID</th>
                  <th scope="col" className="px-6 py-3">Code</th>
                  <th scope="col" className="px-6 py-3">Customer Name</th>
                  <th scope="col" className="px-6 py-3">Contact</th>
                  <th scope="col" className="px-6 py-3">Total (RS)</th>
                  <th scope="col" className="px-6 py-3">Recieved Amount (RS)</th>
                  <th scope="col" className="px-6 py-3">Paid Amount (RS)</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Due Amount (RS)</th>
                  <th scope="col" className="px-6 py-3">Discount (RS)</th>
                  <th scope="col" className="px-6 py-3">Created At</th>
                  <th scope="col" className="px-6 py-3 rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-black bg-white border-2">
                  <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">a16f164b-9c3f-423a-a507-643e6c6f2d45</td>
                  <td className="px-6 py-4 sales-code">SALE-69CC1EAAE28F9</td>
                  <td className="px-6 py-4 customer-name">Customer</td>
                  <td className="px-6 py-4 customer-name">1234567890</td>
                  <td className="px-6 py-4 grand-total" data-grand-total="11000.00">11000.00</td>
                  <td className="px-6 py-4 paid-amount" data-paid-amount="11000.00">11000.00</td>
                  <td className="px-6 py-4 paid-amount" data-paid-amount="11000.00">11000.00</td>
                  <td className="px-6 py-4"><span className="p-3 border-2 rounded-lg bg-[#029ED936]">PAID</span></td>
                  <td className="px-6 py-4 to-pay" data-to-pay="0">0</td>
                  <td className="px-6 py-4 discount">0.00</td>
                  <td className="px-6 py-4 created-at">2026-04-01 00:51:14</td>
                  <td className="flex items-center px-6 py-4 space-x-2">
                    <button className="p-3 border-2 rounded-lg bg-[#029ED9] text-white" onClick={handleMore}>MORE</button>
                  </td>
                </tr>
                <tr className="text-black bg-white border-2">
                  <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">a16f0fb2-5727-4e2d-83a6-e46b2e197971</td>
                  <td className="px-6 py-4 sales-code">SALE-69CC1A57BD3D7</td>
                  <td className="px-6 py-4 customer-name">BANDULA</td>
                  <td className="px-6 py-4 customer-name">0777608679</td>
                  <td className="px-6 py-4 grand-total" data-grand-total="3300.00">3300.00</td>
                  <td className="px-6 py-4 paid-amount" data-paid-amount="3300.00">3300.00</td>
                  <td className="px-6 py-4 paid-amount" data-paid-amount="3300.00">3300.00</td>
                  <td className="px-6 py-4"><span className="p-3 border-2 rounded-lg bg-[#029ED936]">PAID</span></td>
                  <td className="px-6 py-4 to-pay" data-to-pay="0">0</td>
                  <td className="px-6 py-4 discount">0.00</td>
                  <td className="px-6 py-4 created-at">2026-04-01 00:32:47</td>
                  <td className="flex items-center px-6 py-4 space-x-2">
                    <button className="p-3 border-2 rounded-lg bg-[#029ED9] text-white" onClick={handleMore}>MORE</button>
                  </td>
                </tr>
                <tr className="text-black bg-white border-2">
                  <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">a16e5fa0-744b-427f-a7bb-e3d634c7173c</td>
                  <td className="px-6 py-4 sales-code">SALE-69CBA6F433883</td>
                  <td className="px-6 py-4 customer-name">Customer</td>
                  <td className="px-6 py-4 customer-name">1234567890</td>
                  <td className="px-6 py-4 grand-total" data-grand-total="2150.00">2150.00</td>
                  <td className="px-6 py-4 paid-amount" data-paid-amount="2150.00">2150.00</td>
                  <td className="px-6 py-4 paid-amount" data-paid-amount="2150.00">2150.00</td>
                  <td className="px-6 py-4"><span className="p-3 border-2 rounded-lg bg-[#029ED936]">PAID</span></td>
                  <td className="px-6 py-4 to-pay" data-to-pay="0">0</td>
                  <td className="px-6 py-4 discount">100.00</td>
                  <td className="px-6 py-4 created-at">2026-03-31 16:20:28</td>
                  <td className="flex items-center px-6 py-4 space-x-2">
                    <button className="p-3 border-2 rounded-lg bg-[#029ED9] text-white" onClick={handleMore}>MORE</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalesItem;
