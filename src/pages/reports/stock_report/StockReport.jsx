import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Layout from '../../../components/Layout'
import './StockReport.css'
const StockReport = () => {
  useEffect(() => {
    // Hide loading overlay on mount
    const hideLoading = () => {
      const overlay = document.getElementById('loading-overlay');
      if (overlay) overlay.style.display = 'none';
    };
    hideLoading();
  }, []);

  // Generate Report handler
  const handleGenerateReport = async () => {
    const input = document.getElementById('export-area');
    if (!input) return;
    const pdf = new jsPDF('l', 'pt', 'a4');
    await html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('stock-report.pdf');
    });
  };

  return (
    <Layout>
      {/* Loading Overlay */}
      <div id="loading-overlay" className="loading-overlay" style={{display: 'none'}}>
        <div className="text-center">
          <div className="spinner"></div>
        </div>
      </div>

      {/* Breadcrumbs and Header */}
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
                <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Item Stock Count</p>
              </div>
            </li>
          </ol>
          <button
            type="button"
            className="py-3 px-3 bg-black text-white rounded-lg text-xs ml-auto"
            onClick={handleGenerateReport}
          >
            Generate Report
          </button>
        </nav>
      </div>

      {/* Submission Controls */}
      <div className="px-12 max-sm:px-6">
        <form method="POST" action="#">
          <div className="grid gap-4 py-4 md:grid-cols-6">
            <div>
              <label htmlFor="category_id" className="block mb-1 text-xs font-medium text-black">Category</label>
              <select id="category_id" name="category_id" className="w-full p-3 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Categories</option>
                <option value="1">sample category</option>
              </select>
            </div>
            <div>
              <label htmlFor="item_name" className="block mb-1 text-xs font-medium text-black">Item Name</label>
              <input id="item_name" name="item_name" className="w-full p-3 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter item name" />
            </div>
            <div>
              <label htmlFor="from-date" className="block mb-1 text-xs font-medium text-black">From Date</label>
              <input id="from-date" name="from_date" type="date" className="w-full p-3 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Select a date" />
            </div>
            <div>
              <label htmlFor="to-date" className="block mb-1 text-xs font-medium text-black">To Date</label>
              <input id="to-date" name="to_date" type="date" className="w-full p-3 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Select a date" />
            </div>
            <div className="flex justify-start gap-4 md:col-span-2">
              <button type="submit" className="py-0.5 px-3 w-auto bg-[#3c8c2c] text-white rounded-lg text-xs">Submit</button>
              <button type="button" className="py-0.5 px-3 w-auto bg-black text-white rounded-lg text-xs" onClick={() => window.location.reload()}>Reset</button>
            </div>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div id="export-area" className="flex flex-col px-12 py-5 overflow-y-auto bg-white max-sm:px-6 max-lg:min-h-full">
        <span></span>
        <div className="relative h-[500px] overflow-x-auto">
          <table id="ItemStock" className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-white uppercase bg-[#3c8c2c] sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 rounded-tl-lg">No</th>
                <th className="px-3 py-2">Item Name</th>
                <th className="px-3 py-2">Category</th>
                <th className="px-3 py-2">Starting Stock</th>
                <th className="px-3 py-2">Purchased Stock</th>
                <th className="px-3 py-2">Sold Stock</th>
                <th className="px-3 py-2">Ending Stock</th>
                <th className="px-3 py-2 text-right">Purchase Price</th>
                <th className="px-3 py-2 text-right">Retail Price</th>
                <th className="px-3 py-2 text-right">Whole Sale Price</th>
                <th className="px-3 py-2 text-right">Stock Value (Rs.)</th>
                <th className="px-3 py-2 text-right">Price Per Item (Rs.)</th>
                <th className="px-3 py-2 text-right">Sold Stock Value (Rs.)</th>
                <th className="px-3 py-2 rounded-tr-lg">Date</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              <tr>
                <td className="px-3 py-2">1</td>
                <td className="px-3 py-2">test</td>
                <td className="px-3 py-2">sample category</td>
                <td className="px-3 py-2">10</td>
                <td className="px-3 py-2">20010</td>
                <td className="px-3 py-2">2</td>
                <td className="px-3 py-2">10000</td>
                <td className="px-3 py-2 text-right">1000.00</td>
                <td className="px-3 py-2 text-right">1000.00</td>
                <td className="px-3 py-2 text-right">10000.00</td>
                <td className="px-3 py-2 text-right">10,000,000.00</td>
                <td className="px-3 py-2 text-right">1,000.00</td>
                <td className="px-3 py-2 text-right">2,000.00</td>
                <td className="px-3 py-2">2026-03-24</td>
              </tr>
            </tbody>
            <tfoot className="space-y-2 bg-gray-200">
              <tr>
                <th colSpan={10} className="px-3 py-2 font-bold text-left">Total Value (Rs.)</th>
                <th className="px-3 py-2 text-right">20,200,000,000.00</th>
                <th className="px-3 py-2 text-right">2,020,000.00</th>
                <th className="px-3 py-2 text-right">17,600.00</th>
                <th className="px-3 py-2"></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default StockReport;