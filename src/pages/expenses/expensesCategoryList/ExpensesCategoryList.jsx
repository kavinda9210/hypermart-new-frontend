import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/Layout';
import './ExpensesCategoryList.css';



const ExpensesCategoryList = () => {

  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const [entries, setEntries] = useState('30');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('/api/expense-categories')
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, [successMsg]); // reload list after delete

  const filteredRows = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();
    const limit = Number.parseInt(entries, 10);
    const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 30;

    return categories
      .filter((row) => (row.name || '').toLowerCase().includes(normalizedSearch))
      .slice(0, safeLimit);
  }, [searchValue, entries, categories]);

  const handleSearch = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 150);
  };

  const showEntries = (value) => {
    setEntries(value);
  };

  return (
    <Layout>
      <div className="expenses-category-list-page min-h-dvh max-lg:h-fit flex flex-col h-dvh">
      

      <div id="loading-overlay" className={`loading-overlay${loading ? ' show' : ''}`}>
        <div className="text-center">
          <div className="spinner" />
        </div>
      </div>

      <div className="h-[90vh] max-lg:h-[92vh] flex flex-col grow">
        <div className="flex items-center justify-between px-12 py-5 max-md:flex-col max-md:gap-6 max-sm:px-6">
          <div>
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
                    <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Expenses Category List</p>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          <button
            type="button"
            className="p-1 px-3 bg-[#029ED9] text-white rounded-lg hidden"
            onClick={() => setShowAddModal(true)}
          >
            Add New Category
          </button>
        </div>

        <div className="flex items-center justify-between w-full gap-2 px-6 py-3 max-sm:px-4 max-md:flex-col">
          <div className="flex items-center w-1/2 gap-2 px-4 py-2 max-sm:px-3 max-md:w-full">
            <label htmlFor="searchexpensesCat" className="text-xs">Search</label>
            <input
              type="text"
              id="searchexpensesCat"
              className="block w-full p-3 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Expense Category"
              required
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <button
              type="button"
              onClick={handleSearch}
              className="py-3 px-4 bg-[#3c8c2c] text-white rounded-lg text-xs"
            >
              Search
            </button>
          </div>

          <span className="flex items-center gap-2 w-fit max-md:w-full">
            Show
            <input
              type="number"
              id="col_num"
              className="block w-full p-3 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="30"
              min="1"
              value={entries}
              onChange={(event) => showEntries(event.target.value)}
              required
            />
            Entries
          </span>
        </div>

        <div className="px-6 lg:px-12" />
        <div className="flex flex-col flex-grow px-12 py-5 overflow-y-auto bg-white max-sm:px-6 max-lg:min-h-full">
          <span />
          <div className="relative overflow-x-auto">
            <table id="expensesCatTable" className="w-full text-xs text-left text-gray-500 rtl:text-right">
              <thead className="text-xs text-white uppercase bg-[#3c8c2c]">
                <tr>
                  <th scope="col" className="px-4 py-2 rounded-tl-lg">#</th>
                  <th scope="col" className="px-4 py-2">Expense Category</th>
                  <th scope="col" className="px-4 py-2 rounded-tr-lg">Manage</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id} className="text-black bg-white border-2">
                    <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">{row.id}</td>
                    <td className="px-4 py-2 name">{row.name}</td>
                    <td className="px-4 py-2">
                      <button
                        type="button"
                        className="px-3 py-1 text-xs border-2 rounded-lg"
                        onClick={() => navigate(`/expenses/editExpenseCategory/${row.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="px-3 py-1 text-xs text-white bg-red-600 border-2 rounded-lg"
                        onClick={async () => {
                          if (!window.confirm('Are you sure you want to delete this category?')) return;
                          setLoading(true);
                          try {
                            const resp = await fetch(`/api/expense-categories/${row.id}`, { method: 'DELETE' });
                            if (!resp.ok) throw new Error('Delete failed');
                            setSuccessMsg('Category deleted successfully!');
                            setTimeout(() => setSuccessMsg(''), 2000);
                          } catch (e) {
                            alert('Failed to delete category');
                          } finally {
                            setLoading(false);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        
      </div>

      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${showAddModal ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden`}
      >
        <div className="relative w-full max-w-2xl max-h-full p-4">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 border-b rounded-t md:p-5">
              <h3 className="text-xl font-semibold text-gray-900">Add Expenses Category</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 space-y-4 md:p-5">
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-black">Expense Category</label>
              <input
                id="category"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter expense category"
                required
              />
            </div>

            <div className="flex items-center justify-center gap-6 p-4 border-t border-gray-200 rounded-b md:p-5">
              <button type="button" className="py-3 px-6 bg-[#029ED9] text-white rounded-lg max-sm:py-1 max-sm:px-3 max-sm:w-full">Save</button>
              <button type="button" className="px-6 py-3 text-white bg-[#3c8c2c] rounded-lg max-sm:py-1 max-sm:px-3 max-sm:w-full">Reset</button>
              <button type="button" onClick={() => setShowAddModal(false)} className="px-6 py-3 text-white bg-red-600 rounded-lg max-sm:py-1 max-sm:px-3 max-sm:w-full">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ Layout>
  );
};


export default ExpensesCategoryList;