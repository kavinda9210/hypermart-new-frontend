import React from 'react';
import Layout from '../../components/Layout';
import './FinancePage.css';

function FinancePage() {
    // Navigation handlers for main cards
    const handleGoToDashboard = () => window.location.href = '/dashboard';
    const handleGoToPOS = () => window.location.href = '/sales/billing';
    const handleBanks = () => window.location.href = '/finance/banks';
    const handleAccounts = () => window.location.href = '/finance/accounts';
    const handleTransactions = () => window.location.href = '/finance/transactions';
    const handleLedger = () => window.location.href = '/finance/ledger';
    const handlePaymentModes = () => window.location.href = '/finance/payment-modes';
    const handlePaymentMachines = () => window.location.href = '/finance/payment-machines';
  return (
    <Layout onBackToMain={handleGoToDashboard}>
      <div className="flex flex-col flex-grow bg-[#f6f9ff]">
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
                  <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Finance</p>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="flex-grow"></div>

        {/* Main Content */}
        <div className="px-4 pb-8 md:px-12">
          <div className="flex justify-center items-center">
            <div className="h-full w-fit max-[375px]:mb-6">
              <div className="grid grid-cols-2 max-[375px]:grid-cols-1 md:grid-cols-3 place-content-center [375px]:justify-items-center h-full gap-6 text-white 2xl:scale-[110%]">
                {/* Bank Management Card */}
                <button type="button" onClick={handleBanks} className="p-0 bg-transparent border-none" style={{all: 'unset'}}>
                  <div className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer">
                    <div className="w-10 h-10" style={{ background: "url('/images/finance/bank.png') no-repeat", backgroundSize: 'cover' }} />
                    <p className="text-center max-sm:text-sm">Bank Management</p>
                  </div>
                </button>
                {/* Bank Accounts Card */}
                <button type="button" onClick={handleAccounts} className="p-0 bg-transparent border-none" style={{all: 'unset'}}>
                  <div className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer">
                    <div className="w-10 h-10" style={{ background: "url('/images/finance/accounts.png') no-repeat", backgroundSize: 'cover' }} />
                    <p className="text-center max-sm:text-sm">Bank Accounts</p>
                  </div>
                </button>
                {/* Transactions Card */}
                <button type="button" onClick={handleTransactions} className="p-0 bg-transparent border-none" style={{all: 'unset'}}>
                  <div className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <i className="fas fa-exchange-alt text-3xl" />
                    </div>
                    <p className="text-center max-sm:text-sm">Transactions</p>
                  </div>
                </button>
                {/* Ledger Card */}
                <button type="button" onClick={handleLedger} className="p-0 bg-transparent border-none" style={{all: 'unset'}}>
                  <div className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <i className="fas fa-book text-3xl" />
                    </div>
                    <p className="text-center max-sm:text-sm">Ledger</p>
                  </div>
                </button>
                {/* Payment Modes Card */}
                <button type="button" onClick={handlePaymentModes} className="p-0 bg-transparent border-none" style={{all: 'unset'}}>
                  <div className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer">
                    <div className="w-10 h-10" style={{ background: "url('/images/finance/paymentmodes.png') no-repeat", backgroundSize: 'cover' }} />
                    <p className="text-center max-sm:text-sm">Payment Modes</p>
                  </div>
                </button>
                {/* Payment Machines Card */}
                <button type="button" onClick={handlePaymentMachines} className="p-0 bg-transparent border-none" style={{all: 'unset'}}>
                  <div className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer">
                    <div className="w-10 h-10" style={{ background: "url('/images/finance/paymentmachines.png') no-repeat", backgroundSize: 'cover' }} />
                    <p className="text-center max-sm:text-sm">Payment Machines</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default FinancePage;
