import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Layout from '../../../components/Layout';
import './ExpensesList.css';

const ExpensesList = ({ onBackToMain }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [entries, setEntries] = useState(30);
  const [expenses, setExpenses] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch expenses from API
  const fetchExpenses = useCallback(async (search = searchValue, pageArg = page, entriesArg = entries) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      params.set('limit', entriesArg);
      params.set('offset', (pageArg - 1) * entriesArg);
      const resp = await fetch(`/api/expenses-list?${params.toString()}`);
      const data = await resp.json();
      setExpenses(Array.isArray(data.expenses) ? data.expenses : []);
      setTotalCount(Number(data.totalCount) || 0);
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
      setExpenses([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [searchValue, page, entries]);

  // Fetch when page or entries change
  useEffect(() => {
    fetchExpenses(searchValue, page, entries);
  }, [fetchExpenses, searchValue, page, entries]);

  const handleSearch = () => {
    setPage(1);
    // fetchExpenses will be called via useEffect when page changes
  };

  // Handle entries change
  const handleEntriesChange = (e) => {
    const newEntries = Number(e.target.value);
    setEntries(newEntries);
    setPage(1);
  };

  // Pagination calculations
  const safeEntries = Math.max(1, Number(entries) || 30);
  const totalPages = Math.max(1, Math.ceil(totalCount / safeEntries));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = totalCount === 0 ? 0 : (safePage - 1) * safeEntries + 1;
  const endIndex = totalCount === 0 ? 0 : Math.min((safePage - 1) * safeEntries + expenses.length, totalCount);

  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxButtons = 5;
    const last = totalPages;
    const current = safePage;
    let start = Math.max(1, current - Math.floor(maxButtons / 2));
    let end = Math.min(last, start + maxButtons - 1);
    start = Math.max(1, end - maxButtons + 1);
    for (let p = start; p <= end; p += 1) pages.push(p);
    return pages;
  }, [safePage, totalPages]);

  const exportTableToPDF = () => {
    try {
      const doc = new jsPDF();
      autoTable(doc, {
        head: [['ID', 'Expense Title', 'Expense Category', 'Amount', 'Created at']],
        body: expenses.map((row) => [row.id, row.expense_title, row.category, row.amount, row.created_at]),
      });
      doc.save('Expenses.pdf');
    } catch (error) {
      console.error('Failed to export Expenses PDF', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete expense #${id}?`)) {
      try {
        const response = await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
        if (response.ok) {
          // Refresh the list
          fetchExpenses(searchValue, page, entries);
        } else {
          alert('Failed to delete expense');
        }
      } catch (error) {
        console.error('Delete failed:', error);
        alert('An error occurred while deleting');
      }
    }
  };

  return (
    <Layout onBackToMain={onBackToMain}>
      <div className="expenses-list-page flex flex-col flex-grow justify-start items-stretch">
        {loading && (
          <div id="loading-overlay" className="loading-overlay">
            <div className="text-center">
              <div className="spinner" />
            </div>
          </div>
        )}

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
              <button type="button" onClick={handleSearch} className="py-3 px-3 bg-[#3c8c2c] text-white rounded-lg text-xs">Search</button>
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
                onChange={handleEntriesChange}
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
                  {expenses.length === 0 && !loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">No expenses found</td>
                    </tr>
                  ) : (
                    expenses.map((row) => (
                      <tr key={row.id}>
                        <td className="px-4 py-2 text-gray-700">{row.id}</td>
                        <td className="px-4 py-2 Title text-gray-700">{row.expense_title}</td>
                        <td className="px-4 py-2 text-gray-700">{row.category}</td>
                        <td className="px-4 py-2 text-gray-700">{row.amount}</td>
                        <td className="px-4 py-2 text-gray-700">{row.created_at}</td>
                        <td className="px-4 py-2 text-gray-700">
                          <button
                            className="mr-2 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs"
                            title="Edit"
                            onClick={() => navigate(`/expenses/editExpense/${row.id}`)}
                          >
                            Edit
                          </button>
                          <button
                            className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
                            title="Delete"
                            onClick={() => handleDelete(row.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center p-1 mt-1 mb-6 bg-white">
              <div className="pagination" style={{ width: '100%', margin: '0px 50px' }}>
                <nav role="navigation" aria-label="Pagination Navigation" className="flex items-center justify-between">
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between w-full">
                    <div>
                      <p className="text-sm leading-5 text-gray-700">
                        Showing <span className="font-medium">{startIndex}</span> to <span className="font-medium">{endIndex}</span> of <span className="font-medium">{totalCount}</span> results
                      </p>
                    </div>
                    <div>
                      <span className="relative z-0 inline-flex rounded-md shadow-sm rtl:flex-row-reverse">
                        <button
                          type="button"
                          aria-label="Previous"
                          disabled={safePage <= 1}
                          onClick={() => setPage(p => Math.max(1, p - 1))}
                          className={`relative inline-flex items-center px-2 py-2 text-sm font-medium leading-5 border border-gray-300 rounded-l-md ${safePage <= 1 ? 'text-gray-400 bg-white cursor-default' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        {pageNumbers.map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setPage(p)}
                            className={`relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 border ${p === safePage ? 'text-white bg-blue-600 border-blue-600 cursor-default' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'}`}
                            aria-label={`Go to page ${p}`}
                            disabled={p === safePage}
                          >
                            {p}
                          </button>
                        ))}
                        <button
                          type="button"
                          aria-label="Next"
                          disabled={safePage >= totalPages}
                          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                          className={`relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium leading-5 border border-gray-300 rounded-r-md ${safePage >= totalPages ? 'text-gray-400 bg-white cursor-default' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </span>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExpensesList;