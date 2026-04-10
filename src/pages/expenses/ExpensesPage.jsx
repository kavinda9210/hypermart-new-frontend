

import React from 'react';

function ExpensesPage() {
    // Navigation handlers for buttons
    const handleAddExpense = () => window.location.href = '/expenses/addExpense';
    const handleAddExpenseCategory = () => window.location.href = '/expenses/addExpenseCategory';
    const handleExpensesList = () => window.location.href = '/expenses/expensesList';
    const handleExpensesCategoryList = () => window.location.href = '/expenses/expensesCategoryList';
  // Handler for back navigation
  const handleBack = () => window.history.go(-1);

  return (
    <div className="min-h-dvh max-lg:h-fit flex flex-col h-dvh bg-[#f6f9ff]">
      {/* Nav Bar */}
      <div className="nav bg-[#3c8c2c] w-full h-[10%] max-lg:h-[17dvh] py-6 flex justify-between items-center max-md:justify-center max-md:flex-col md:px-14 lg:px-0">
        <span className="flex items-center gap-3 ml-20 max-lg:ml-0 max-sm:scale-75">
          <button
            onClick={handleBack}
            className="rounded-full w-[50px] aspect-square bg-white flex justify-center items-center hover:scale-90 transition-all"
          >
            <i className="text-xl text-[#000000] fas fa-arrow-left" />
          </button>
          <button
            onClick={() => (window.location.href = '/dashboard')}
            className="p-2 text-[#000000] rounded-lg bg-white flex gap-3 justify-center items-center hover:scale-90 transition-all"
          >
            <i className="text-xl text-[#000000] fas fa-city" />
            Go to Main Panel
          </button>
          <a
            href="/sales/billing"
            className="p-2 text-[#000000] rounded-lg bg-white flex gap-3 justify-center items-center hover:scale-90 transition-all"
          >
            POS
          </a>
        </span>
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:block">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-14 max-sm:h-8 bg-white p-1 rounded-full"
          />
        </div>
        <span className="flex items-center gap-3 mr-20 max-lg:mr-0 max-sm:scale-75">
          <div className="flex flex-col items-end text-right">
            <h3 className="text-2xl max-md:text-sm text-[#ffffff]">Good Morning!</h3>
            <h3 className="text-sm text-[#ffffff]">Welcome HYPERMART</h3>
          </div>
          <button
            onClick={() => alert('Frontend demo: logout action disabled.')}
            className="rounded-full w-[50px] aspect-square bg-white flex justify-center items-center hover:scale-90 transition-all"
          >
            <i className="text-xl font-bold text-[#000000] fas fa-sign-out-alt" />
          </button>
        </span>
      </div>

      {/* Breadcrumbs */}
      <div className="flex flex-col flex-grow justify-start items-center">
        <div className="w-full px-12 py-5 max-sm:px-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <p className="inline-flex items-center text-sm font-medium text-gray-700">
                  Expenses
                </p>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" /></svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Expenses</span>
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

      {/* Footer */}
      <footer className="bg-[#3c8c2c] py-4 text-center text-[#ffffff]">
        <p>2026 © All Rights Reserved | Hypermart | Designed and Developed by Silicon Radon Networks (Pvt) Ltd</p>
      </footer>
    </div>
  );
}

export default ExpensesPage;
