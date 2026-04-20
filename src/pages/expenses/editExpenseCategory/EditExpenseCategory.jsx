import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../../components/Layout';

const EditExpenseCategory = ({ onBackToMain }) => {
  const formRef = useRef(null);
  const { id: categoryId } = useParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`/api/expense-categories/${categoryId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch category');
        return res.json();
      })
      .then(data => setCategoryName(data.name || ''))
      .catch(() => setError('Failed to fetch category'))
      .finally(() => setLoading(false));
  }, [categoryId]);

  const resetForm = () => {
    setCategoryName('');
    setSuccess(null);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const resp = await fetch(`/api/expense-categories/${categoryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: categoryName }),
      });
      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to update category');
      }
      setSuccess('Expense category updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout onBackToMain={onBackToMain}>
      <div className="add-expense-category-page flex flex-col flex-grow">
        {loading && (
          <div id="loading-overlay" className="loading-overlay">
            <div className="text-center">
              <div className="spinner" />
            </div>
          </div>
        )}
        {success && (
          <div className="p-4 mb-4 text-green-800 rounded-lg bg-green-100">{success}</div>
        )}
        {error && (
          <div className="p-4 mb-4 text-red-800 rounded-lg bg-red-100">{error}</div>
        )}

        <div className="flex flex-col flex-grow">
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
                    <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Edit Expense Category</p>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          <div className="px-6 lg:px-12" />

          <form ref={formRef} method="POST" action="#" onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off">
            <div className="px-6 lg:px-12">
              <div className="flex flex-col flex-grow h-full p-6 border-2 rounded-lg bg-white">
                <div className="grid gap-6 mb-6 md:grid-cols-1">
                  <div>
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-black">Expense Category</label>
                    <input
                      id="category"
                      type="text"
                      name="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Enter expense category"
                      required
                      value={categoryName}
                      onChange={e => setCategoryName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center w-full gap-4 max-sm:flex-col max-sm:p-0">
                  <button type="submit" className="py-3 px-6 bg-[#3c8c2c] text-white rounded-lg max-sm:py-1 max-sm:px-3 max-sm:w-full">Update</button>
                  <button type="button" onClick={resetForm} className="px-6 py-3 text-white bg-[#3c8c2c] rounded-lg max-sm:py-1 max-sm:px-3 max-sm:w-full">Reset</button>
                  <button type="button" className="px-6 py-3 text-white bg-red-600 rounded-lg max-sm:py-1 max-sm:px-3 max-sm:w-full" onClick={() => window.location.assign('/expenses/expenses')}>Cancel</button>
                </div>
              </div>
            </div>
          </form>

          <div className="flex-grow" />
        </div>
      </div>
    </Layout>
  );
};

export default EditExpenseCategory;
