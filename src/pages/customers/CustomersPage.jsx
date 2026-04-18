import './CustomersPage.css';
import Layout from '../../components/Layout';
import { useNavigate } from 'react-router-dom';
import { hasAllPermissions, hasAnyPermission } from '../../utils/permissions';


function CustomersPage() {
  const navigate = useNavigate();
  const handleAddNewCustomer = () => navigate('/customers/add_customer');
  const handleCustomerList = () => navigate('/customers/customer_list');
  // const handleImportCustomers = () => navigate('/customers/import_customers');
  const handleCustomerTransactions = () => navigate('/customers/transactions');
  const handleCustomerInvoices = () => navigate('/sales/customer_invoice');


  return (
    <Layout>
      <div className="flex flex-col flex-grow justify-start items-center bg-white min-h-dvh">
        {/* Breadcrumbs */}
        <div className="w-full px-12 py-5 max-sm:px-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <p className="inline-flex items-center text-sm font-medium text-gray-700">
                  <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" /></svg>
                  Main Panel
                </p>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" /></svg>
                  <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Customers</p>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        {/* Button container */}
        <div className="grid h-full p-6 w-fit place-items-center">
          <div className="grid grid-cols-2 place-items-center max-[375px]:grid-cols-1 place-content-center [375px]:justify-items-center h-full gap-6 text-white 2xl:scale-[110%]">
            {hasAllPermissions('Access_Customers', 'Add New Customers') && (
              <button type="button" className="no-underline p-0 bg-transparent border-none" onClick={handleAddNewCustomer} style={{all: 'unset'}}>
                <div className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer">
                  <div className="w-10 h-10" style={{background: "url('https://hypermart-new.onlinesytems.com/images/customers/addNewCustomer.png') no-repeat", backgroundSize: 'cover'}}></div>
                  <p className="text-center max-sm:text-sm">Add New Customer</p>
                </div>
              </button>
            )}
            {hasAllPermissions('Access_Customers', 'View Customer List') && (
              <button type="button" className="no-underline p-0 bg-transparent border-none" onClick={handleCustomerList} style={{all: 'unset'}}>
                <div className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer">
                  <div className="w-20 h-10" style={{background: "url('https://hypermart-new.onlinesytems.com/images/customers/customerList.png') no-repeat", backgroundSize: 'cover'}}></div>
                  <p className="text-center max-sm:text-sm">Customer List</p>
                </div>
              </button>
            )}
            {hasAnyPermission('Access_Customers') && (
              <button type="button" className="no-underline p-0 bg-transparent border-none" onClick={handleCustomerTransactions} style={{all: 'unset'}}>
                <div className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer">
                  <div className="w-20 h-10" style={{background: "url('https://hypermart-new.onlinesytems.com/images/customers/customerList.png') no-repeat", backgroundSize: 'cover'}}></div>
                  <p className="text-center max-sm:text-sm">Customer Transactions</p>
                </div>
              </button>
            )}
            {hasAnyPermission('Access_Customers') && (
              <button type="button" className="no-underline p-0 bg-transparent border-none" onClick={handleCustomerInvoices} style={{all: 'unset'}}>
                <div className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer">
                  <div className="w-20 h-10" style={{background: "url('https://hypermart-new.onlinesytems.com/images/customers/customerList.png') no-repeat", backgroundSize: 'cover'}}></div>
                  <p className="text-center max-sm:text-sm">Customer Invoices</p>
                </div>
              </button>
            )}
          </div>
                
        </div>
            
        </div>
      
    </Layout>
  );
}

export default CustomersPage;
