import React from 'react';
import Layout from '../../components/Layout';

function ExpensesPage() {
    // Navigation handlers for buttons
    const handleAddExpense = () => window.location.href = '/expenses/addExpense';
    const handleAddExpenseCategory = () => window.location.href = '/expenses/addExpenseCategory';
    const handleExpensesList = () => window.location.href = '/expenses/expensesList';
    const handleExpensesCategoryList = () => window.location.href = '/expenses/expensesCategoryList';
  // Handler for back navigation
  const handleBack = () => window.history.go(-1);

  return (
    <Layout onBackToMain={() => (window.location.href = '/dashboard')}>
      <div className="flex flex-col flex-grow justify-start items-center bg-[#f6f9ff]">
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
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                  <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Expenses</p>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Button container */}
        <div className="h-full w-fit">
          <div className="grid grid-cols-2 max-[375px]:grid-cols-1 place-content-center [375px]:justify-items-center h-full gap-6 text-white 2xl:scale-[110%]">
            {/* Add New Expense */}
            <button type="button" className="p-0 bg-transparent border-none" onClick={handleAddExpense} style={{all: 'unset'}}>
              <div className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer">
                <div className="w-10 h-10" style={{ background: "url('/images/expenses/addNewExpense.png') no-repeat", backgroundSize: 'cover' }} />
                <p className="text-center max-sm:text-sm">Add New Expense</p>
              </div>
            </button>
            {/* Add Expense Category */}
            <button type="button" className="p-0 bg-transparent border-none" onClick={handleAddExpenseCategory} style={{all: 'unset'}}>
              <div className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer">
                <div className="w-10 h-10" style={{ background: "url('/images/expenses/addNewExoenseCategory.png') no-repeat", backgroundSize: 'cover' }} />
                <p className="text-center max-sm:text-sm">Add Expense Category</p>
              </div>
            </button>
            {/* Expenses List */}
            <button type="button" className="p-0 bg-transparent border-none" onClick={handleExpensesList} style={{all: 'unset'}}>
              <div className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer">
                <div className="w-10 h-10 flex items-center justify-center">
                  <i className="fas fa-list text-3xl" />
                </div>
                <p className="text-center max-sm:text-sm">Expenses List</p>
              </div>
            </button>
            {/* Expenses Category List */}
            <button type="button" className="p-0 bg-transparent border-none" onClick={handleExpensesCategoryList} style={{all: 'unset'}}>
              <div className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer">
                <div className="w-10 h-10 flex items-center justify-center">
                  <i className="fas fa-th-list text-3xl" />
                </div>
                <p className="text-center max-sm:text-sm">Expenses Category List</p>
              </div>
            </button>
          </div>
        </div>

        <div className="flex-grow" />
      </div>
    </Layout>
  );
}

export default ExpensesPage;
