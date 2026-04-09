import PaymentDetails from './pages/sales/payment_details/PaymentDetails';
import CustomerInvoice from './pages/sales/customer_invoice/CusomerInvoice';
import ReturnListView from './pages/sales/return_list_view/ReturnListView';
import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
// Dashboard and Main Panel
import Dashboard from './pages/Dashboard';
import DashbordDashboard from './pages/dashbord/Dashboard';
// Billing and Sales
import Billing from './pages/sales/Billing';
// Item Management
import ItemPage from './pages/item/ItemPage';
import AddItemPage from './pages/item/add_item/AddItemPage';
import AddCategoryPage from './pages/item/add_category/AddCategoryPage';
import ItemListPage from './pages/item/item_list/ItemListPage';
import CategoryListPage from './pages/item/category/CategoryListPage';
import EditItemPage from './pages/item/item_list/EditItemPage';
import EditCategory from './pages/item/category/EditCategory';
import ImportItem from './pages/item/import_item/ImportItem';
import GenerateQRCode from './pages/item/GenerateQRCode/GenerateQRCode';
import ExportPanel from './pages/item/ExportPanel/ExportPanel';

// Stock Management
import Stock from './pages/stock/Stock';
import UpdateStock from './pages/stock/update_stock/UpdateStock';
import ViewRelatedStock from './pages/stock/view_related_stock/ViewRelatedStock';
// Sales Management
import SalesPage from './pages/sales/SalesPage';
import SalesItem from './pages/sales/sales_item/SalesItem';

// Due Amount
import DueAmount from './pages/sales/dueAmount/DueAmount';

// User Management
import UsersPage from './pages/users/UsersPage';
import AddUsers from './pages/users/add_users/AddUsers';
import EditUsers from './pages/users/edit_users/EditUsers';
import UserList from './pages/users/user_list/UserList';
import AddRole from './pages/users/add_role/AddRole';
import EditRole from './pages/users/edit_role/EditRole';
import RoleList from './pages/users/role_list/RoleList';
import AddPermission from './pages/users/add_permission/AddPermission';
import EditPermission from './pages/users/edit_permission/EditPermission';
import PermissionList from './pages/users/permission_list/PermissionList';

  

// Customer Management
import CustomersPage from './pages/customers/CustomersPage';
// import AddCustomer from './pages/customers/add_customer/AddCustomer';
// import CustomerList from './pages/customers/customer_list/CustomerList';
// import EditCustomer from './pages/customers/edit_customer/EditCustomer';
// import Transactions from './pages/customers/transactions/Transactions';
// import customerTransctions from './pages/customers/transactions/Transactions';
// import TransactionHistory from './pages/customers/transaction_history/TransactionHistory';
// import transactionLog from './pages/customers/transaction-log/TransactionLog ';
// import BalanceTransactionLog  from './pages/customers/balance_transaction_log/BalanceTransactionLog'; 


// Supplier Management
import SuppliersPage from './pages/suppliers/SuppliersPage';
// Expenses Management
import ExpensesPage from './pages/expenses/ExpensesPage';
// Finance Management
import FinancePage from './pages/finance/FinancePage';

// Reports
import ReportsPage from './pages/reports/ReportsPage';
import StockReport from './pages/reports/stock_report/StockReport';
// Settings
import SettingsPage from './pages/settings/SettingsPage';



function App() {
  const navigate = useNavigate();
  const goToMainPanel = () => navigate('/dashboard');

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          path="/dashboard"
          element={
            <Dashboard
              onOpenDashbord={() => navigate('/dashboard/dashboard')}
              onOpenBilling={() => navigate('/sales/billing')}
              onOpenItem={() => navigate('/item')}
              onExportPanel={() => navigate('/item/export_panel')}
              onStock={() => navigate('/stock/stock')}
              onOpenSales={() => navigate('/sales/sales')}
              onDueAmount={() => navigate('sales/due_amount')}
              onOpenUsers={() => navigate('/users/users')}
              onOpenCustomers={() => navigate('/customers/customers')}
              onOpenSuppliers={() => navigate('/suppliers/suppliers')}
              onOpenExpenses={() => navigate('/expenses/expenses')}
              onOpenFinance={() => navigate('/finance')}
              onOpenReports={() => navigate('/reports/reports')}
              onOpenStockReport={() => navigate('reports/stock_report')}
              onOpenSettings={() => navigate('/settings/settings')}
            />
          }
        />
          {/* Dashboard */}
        <Route path="/dashboard/dashboard" element={<DashbordDashboard onBackToMain={goToMainPanel} />} />
          {/* Sales */}
        <Route path="/sales/billing" element={<Billing onBackToMain={goToMainPanel} />} />
        <Route path="/sales/sales" element={<SalesPage onBackToMain={goToMainPanel} />} />
        <Route path="/sales/sales_item" element={<SalesItem />} />
        <Route path="/sales/return_list_view" element={<ReturnListView />} />
        <Route path="/sales/payment_details" element={<PaymentDetails />} />

        {/* Customer Invoice */}
        <Route path="/sales/customer_invoice" element={<CustomerInvoice />} />

          {/* Item Management */}
        <Route path="/item" element={<ItemPage onBackToMain={goToMainPanel} />} />
        <Route path="/item/add_item" element={<AddItemPage />} />
        <Route path="/item/add_category" element={<AddCategoryPage />} />
        <Route path="/item/edit_item" element={<EditItemPage />} />
        <Route path="/item/category/edit_category" element={<EditCategory />} />
        <Route path="/item/item_list" element={<ItemListPage />} />
        <Route path="/item/category_list" element={<CategoryListPage />} />
        <Route path="/item/importItem" element={<ImportItem />} />
        <Route path="/item/generate_qr_code" element={<GenerateQRCode />} />
        <Route path="/item/genarateCode" element={<Navigate to="/item/generate_qr_code" replace />} />
        <Route path="/item/export_panel" element={<ExportPanel />} />

          {/* Stock Management */}
        <Route path="/stock/stock" element={<Stock onBackToMain={goToMainPanel} />} />
        <Route path="/stock/update_stock" element={<UpdateStock onBackToMain={goToMainPanel} />} />
        <Route path="/stock/view_related_stock" element={<ViewRelatedStock onBackToMain={goToMainPanel} />} />
        
        <Route path="sales/due_amount" element={<DueAmount onBackToMain={goToMainPanel} />} />

          {/* User Management */}
        <Route path="/users/users" element={<UsersPage onBackToMain={goToMainPanel} />} />
        <Route path="/users/add_users" element={<AddUsers onBackToMain={goToMainPanel} />} />
        <Route path="/users/edit_users" element={<EditUsers onBackToMain={goToMainPanel} />} />
        <Route path="/users/user_list" element={<UserList onBackToMain={goToMainPanel} />} />
        <Route path="/users/role_list" element={<RoleList onBackToMain={goToMainPanel} />} />
        <Route path="/users/add_role" element={<AddRole onBackToMain={goToMainPanel} />} />
        <Route path="/users/edit_role" element={<EditRole onBackToMain={goToMainPanel} />} />
        <Route path="/users/permission_list" element={<PermissionList onBackToMain={goToMainPanel} />} />
        <Route path="/users/add_permission" element={<AddPermission onBackToMain={goToMainPanel} />} />
        <Route path="/users/edit_permission" element={<EditPermission onBackToMain={goToMainPanel} />} />

        <Route path="/customers/customers" element={<CustomersPage onBackToMain={goToMainPanel} />} />
        <Route path="/suppliers/suppliers" element={<SuppliersPage onBackToMain={goToMainPanel} />} />
        <Route path="/expenses/expenses" element={<ExpensesPage onBackToMain={goToMainPanel} />} />
        <Route path="/finance" element={<FinancePage onBackToMain={goToMainPanel} />} />
        <Route path="/reports/reports" element={<ReportsPage onBackToMain={goToMainPanel} />} />
        <Route path="/reports/stock_report" element={<StockReport onBackToMain={goToMainPanel} />} />
        <Route path="/settings/settings" element={<SettingsPage onBackToMain={goToMainPanel} />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}

export default App;