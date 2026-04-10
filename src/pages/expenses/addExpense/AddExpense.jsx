import React, { useRef, useState } from 'react';
import Layout from '../../../components/Layout';
import './AddExpense.css';

function SearchableSelect({ label, options, value, onChange, placeholder, name, required }) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const selectedOption = value ? options.find((option) => option.value === value) : null;
  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="mb-2 relative">
      {label ? (
        <label className="block mb-2 text-sm font-medium text-black">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      ) : null}
      <div className="relative">
        <button
          ref={inputRef}
          type="button"
          className="expense-select-trigger bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-left"
          onClick={() => {
            setOpen((current) => !current);
            setSearch('');
          }}
        >
          {selectedOption?.label || placeholder}
        </button>
        {value && (
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-400"
            onClick={() => {
              onChange('');
              setSearch('');
              setOpen(true);
            }}
          >
            &times;
          </button>
        )}
      </div>
      <input type="hidden" name={name} value={value} />
      {open && (
        <div className="searchable-select-dropdown absolute z-10 bg-white border border-gray-300 rounded-lg w-full shadow">
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="max-h-40 overflow-y-auto">
            {filteredOptions.length === 0 && <div className="p-2 text-gray-400">No results</div>}
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className="p-2 hover:bg-blue-100 cursor-pointer"
                onMouseDown={() => {
                  onChange(option.value);
                  setOpen(false);
                  setSearch('');
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const AddExpense = ({ onBackToMain }) => {
  const formRef = useRef(null);
  const dateInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');

  const expenseCategoryOptions = [
    { value: '', label: 'Select expense category' },
    { value: '1', label: 'Mortgage' },
  ];

  const resetForm = () => {
    formRef.current?.reset();
    setExpenseDate('');
    setExpenseCategory('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    window.setTimeout(() => {
      setLoading(false);
      resetForm();
    }, 600);
  };

  return (
    <Layout onBackToMain={onBackToMain}>
      <div className="add-expense-page flex flex-col flex-grow">
        {loading && (
          <div id="loading-overlay" className="loading-overlay">
            <div className="text-center">
              <div className="spinner" />
            </div>
          </div>
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
                    <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Add New Expense</p>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          <div className="px-6 lg:px-12" />

          <form ref={formRef} method="POST" action="https://hypermart-new.onlinesytems.com/expenses/addExpense" onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="hidden" name="_token" value="lV3JlfzCkgPECFRBCdzhJF9SqMhIjHSHrPuXtcvI" autoComplete="off" />

            <div className="px-6 lg:px-12">
              <div className="flex flex-col flex-grow h-full p-6 border-2 rounded-lg bg-white">
                <div className="grid gap-6 mb-6 md:grid-cols-3">
                  <div>
                    <label htmlFor="exp_date" className="block mb-2 text-sm font-medium text-black">Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                      </div>
                      <input
                        id="exp_date_display"
                        type="text"
                        readOnly
                        value={expenseDate}
                        placeholder="Select date"
                        className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 cursor-pointer"
                        onClick={() => dateInputRef.current?.showPicker?.() || dateInputRef.current?.click()}
                      />
                      <input
                        ref={dateInputRef}
                        id="exp_date"
                        type="date"
                        name="expense_date"
                        className="expense-date-input"
                        value={expenseDate}
                        onChange={(event) => setExpenseDate(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-black">Expense Title</label>
                    <input
                      id="title"
                      type="text"
                      name="expense_title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Enter expense title"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-6 mb-6 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <label htmlFor="expense-search" className="block mb-2 text-sm font-medium text-black">Expence Category</label>
                    <SearchableSelect
                      label=""
                      options={expenseCategoryOptions}
                      value={expenseCategory}
                      onChange={setExpenseCategory}
                      placeholder="Select or search expense category"
                      name="exp_cat"
                      required={false}
                    />
                  </div>
                </div>

                <div className="grid gap-6 mb-6 md:grid-cols-3">
                  <div>
                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-black">Amount</label>
                    <input
                      id="amount"
                      type="text"
                      name="amount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                </div>

                <div className="grid mb-6 md:grid-cols-1">
                  <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900">Details</label>
                  <textarea
                    id="details"
                    rows="4"
                    name="details"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Details"
                  />
                </div>

                <div className="flex items-center justify-center w-full gap-4 max-sm:flex-col max-sm:p-0">
                  <button type="submit" className="py-3 px-6 bg-[#3c8c2c] text-white rounded-lg max-sm:py-1 max-sm:px-3 max-sm:w-full">Add</button>
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

export default AddExpense;