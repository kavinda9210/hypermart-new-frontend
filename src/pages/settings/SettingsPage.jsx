import React from 'react';
import './SettingsPage.css';

function SettingsPage() {

  // Navigation handlers for settings buttons
      
      const handleSiteSettings = () => window.location.href = '/settings/siteSettings';
      const handleChangePassword = () => window.location.href = '/settings/changePassword';
      const handleChangeSite = () => window.location.href = '/settings/changeSite';
      const handlePCRegistrations = () => window.location.href = '/admin/pos_machines';
  return (
    <div className="min-h-dvh max-lg:h-fit flex flex-col h-dvh bg-[#f6f9ff]">
      {/* Nav Bar */}
      <div className="nav bg-[#3c8c2c] w-full h-[10%] max-lg:h-[17dvh] py-6 flex justify-between items-center max-md:justify-center max-md:flex-col md:px-14 lg:px-0">
        <span className="flex items-center gap-3 ml-20 max-lg:ml-0 max-sm:scale-75">
          <button
            onClick={() => window.history.go(-1)}
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
                  <svg className="w-3 h-3 me-2.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Main Panel
                </p>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                  <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Settings</p>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Button container */}
        <div className="w-fit max-[375px]:h-fit h-full">
          <div className="grid h-full gap-6 place-items-center place-content-center">
      
            <div className="grid grid-cols-2 place-items-center max-sm:grid-cols-2 max-[375px]:grid-cols-1 place-content-center [375px]:justify-items-center gap-6 text-white 2xl:scale-[110%]">
              
                  
              {/* Site Settings */}
                  <button type="button" onClick={handleSiteSettings} className="p-0 bg-transparent border-none" style={{all: 'unset'}}>
                    <div className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer">
                      <div className="w-10 h-10" style={{ background: "url('/images/settings/siteSettings.png') no-repeat", backgroundSize: 'cover' }} />
                      <p className="text-center max-sm:text-sm">Site Settings</p>
                    </div>
                  </button>
              {/* Unit List (hidden) */}
              <div className="w-[200px] max-lg:w-[150px] border-2 border-[#67AB9F] h-[200px] max-lg:h-[150px] bg-[#67AB9F] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer" style={{ display: 'none' }}>
                <div className="w-10 h-15">
                  <img src="/images/settings/unitList.png" alt="Unit List" />
                </div>
                <p className="text-center max-sm:text-sm">Unit List</p>
              </div>
              {/* Branch List (hidden) */}
              <div className="w-[200px] max-lg:w-[150px] border-2 border-[#67AB9F] h-[200px] max-lg:h-[150px] bg-[#67AB9F] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer" style={{ display: 'none' }}>
                <div className="w-10 h-15">
                  <img src="/images/settings/branchList.png" alt="Branch List" />
                </div>
                <p className="text-center max-sm:text-sm">Branch List</p>
              </div>
              {/* Change Password */}
                <button type="button" onClick={handleChangePassword} className="p-0 bg-transparent border-none" style={{all: 'unset'}}>
                  <div className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer">
                    <div className="w-10 h-10" style={{ background: "url('/images/settings/changePassword.png') no-repeat", backgroundSize: 'cover' }} />
                    <p className="text-center max-sm:text-sm">Change Password</p>
                  </div>
                </button>
              {/* Change Site */}
                <button type="button" onClick={handleChangeSite} className="p-0 bg-transparent border-none" style={{all: 'unset'}}>
                  <div className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer">
                    <div className="w-10 h-10" style={{ background: "url('/images/settings/changeSite.png') no-repeat", backgroundSize: 'cover' }} />
                    <p className="text-center max-sm:text-sm">Change Site</p>
                  </div>
                </button>
              {/* PC Registrations */}
                <button type="button" onClick={handlePCRegistrations} className="p-0 bg-transparent border-none" style={{all: 'unset'}}>
                  <div className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer">
                    <div className="w-10 h-10" style={{ background: "url('/images/main-panel/btn-icons/pc.png') no-repeat", backgroundSize: 'cover' }} />
                    <p className="text-center max-sm:text-sm">PC Registrations</p>
                  </div>
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#3c8c2c] py-4 text-center text-[#ffffff]">
        <p>2026 © All Rights Reserved | Hypermart | Designed and Developed by Silicon Radon Networks (Pvt) Ltd</p>
      </footer>
    </div>
  );
}



export default SettingsPage;
