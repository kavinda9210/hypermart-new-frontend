import React, { useMemo, useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Layout from '../../../components/Layout';
import './ExpensesList.css';

const expenseRows = [];

const ExpensesList = ({ onBackToMain }) => {
  const [searchValue, setSearchValue] = useState('');
  const [entries, setEntries] = useState('30');

  const filteredRows = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();
    const limit = Number.parseInt(entries, 10);
    const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 30;

    return expenseRows
      .filter((row) => row.title.toLowerCase().includes(normalizedSearch))
      .slice(0, safeLimit);
  }, [searchValue, entries]);

  const exportTableToPDF = () => {
    try {
      const doc = new jsPDF();

      autoTable(doc, {
        head: [['ID', 'Expense Title', 'Expense Category', 'Amount', 'Created at']],
        body: filteredRows.map((row) => [row.id, row.title, row.category, row.amount, row.createdAt]),
      });

      doc.save('Expenses.pdf');
    } catch (error) {
      console.error('Failed to export Expenses PDF', error);
    }
  };

  return (
    <Layout onBackToMain={onBackToMain}>
      <div className="expenses-list-page flex flex-col flex-grow justify-start items-stretch">
        <div id="loading-overlay" className="loading-overlay" style={{ display: 'none' }}>
          <div className="text-center">
            <div className="spinner" />
          </div>
        </div>

        <div className="flex flex-col grow w-full">
          <div className="w-full px-12 py-5 max-sm:px-6">
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
                    <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Expenses</p>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Expenses List</p>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          <div className="flex items-center justify-between w-full gap-2 px-6 py-3 max-sm:px-6 max-md:flex-col">
            <div className="flex items-center w-1/2 gap-2 px-6 py-3 max-sm:px-6 max-md:w-full">
              <label htmlFor="searchExpensesName" className="text-xs">Search</label>
              <input
                type="text"
                id="searchExpensesName"
                className="block w-full p-3 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Expense Title"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <button type="button" onClick={() => setSearchValue(searchValue)} className="py-3 px-3 bg-[#3c8c2c] text-white rounded-lg text-xs">Search</button>
            </div>

            <span className="flex items-center gap-2 text-xs w-fit max-md:w-full">
              Show
              <input
                type="number"
                id="col_num"
                className="block w-full p-3 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="30"
                min="1"
                value={entries}
                onChange={(event) => setEntries(event.target.value)}
              />
              Entries
            </span>

            <button type="button" className="px-3 py-3 text-xs text-white bg-[#3c8c2c] rounded-lg max-sm:px-3 max-sm:py-1" onClick={exportTableToPDF}>PDF</button>
          </div>

          <div className="flex flex-col flex-grow w-full px-12 py-5 bg-white max-sm:px-6">
            <div className="relative">
              <table id="expensesTable" className="w-full text-xs text-left text-gray-500 rtl:text-right">
                <thead className="text-xs text-white uppercase bg-[#3c8c2c]">
                  <tr>
                    <th scope="col" className="px-4 py-2 rounded-tl-lg">ID</th>
                    <th scope="col" className="px-4 py-2">Expense Title</th>
                    <th scope="col" className="px-4 py-2">Expense Category</th>
                    <th scope="col" className="px-4 py-2">Amount</th>
                    <th scope="col" className="px-4 py-2">Created at</th>
                    <th scope="col" className="px-4 py-2 rounded-tr-lg">Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.length === 0 ? null : filteredRows.map((row) => (
                    <tr key={row.id}>
                      <td className="px-4 py-2">{row.id}</td>
                      <td className="px-4 py-2 Title">{row.title}</td>
                      <td className="px-4 py-2">{row.category}</td>
                      <td className="px-4 py-2">{row.amount}</td>
                      <td className="px-4 py-2">{row.createdAt}</td>
                      <td className="px-4 py-2">-</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default ExpensesList;