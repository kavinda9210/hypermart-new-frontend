import './Dashboard.css';
import DueAmount from './sales/dueAmount/DueAmount';
import Layout from '../components/Layout';

const panelItems = [
  {
    label: 'Dashboard',
    href: '/dash/dash',
    icon: '/images/main-panel/btn-icons/dash.svg',
    alt: 'Dashboard',
  },
  {
    label: 'Billing',
    href: '/sales/billing',
    icon: '/images/main-panel/btn-icons/installment.svg',
    alt: 'Installment',
    target: '_blank',
  },
  {
    label: 'Items',
    href: '/item/item',
    icon: '/images/main-panel/btn-icons/items.svg',
    alt: 'Items',
  },
  {
    label: 'Export Items',
    href: '/item/exportPanel',
    icon: '/images/main-panel/btn-icons/reports.svg',
    alt: 'Export Items',
  },
  {
    label: 'Stock',
    href: '/stock/stock',
    icon: '/images/main-panel/btn-icons/stock.svg',
    alt: 'Stock',
  },
  {
    label: 'Sales',
    href: '/sales/sales',
    icon: '/images/main-panel/btn-icons/sales.svg',
    alt: 'Sales',
  },
  {
    label: 'Due Amount',
    href: '/sales/due_amount',
    icon: '/images/main-panel/btn-icons/billing.svg',
    alt: 'Due Amount',
  },
  {
    label: 'Users',
    href: '/users/users',
    icon: '/images/main-panel/btn-icons/users.svg',
    alt: 'Users',
  },
  {
    label: 'Customer',
    href: '/customers/customers',
    icon: '/images/main-panel/btn-icons/customer.svg',
    alt: 'Customer',
  },
  {
    label: 'Suppliers',
    href: '/suppliers/suppliers',
    icon: '/images/main-panel/btn-icons/suppliers.svg',
    alt: 'Suppliers',
  },
  {
    label: 'Expenses',
    href: '/expenses/expenses',
    icon: '/images/main-panel/btn-icons/expenses.svg',
    alt: 'Expenses',
  },
  {
    label: 'Finance Management',
    href: '/finance',
    iconType: 'finance',
  },
  {
    label: 'Reports',
    href: '/reports/reports',
    icon: '/images/main-panel/btn-icons/reports.svg',
    alt: 'Reports',
  },
  {
    label: 'Settings',
    href: '/settings/settings',
    icon: '/images/main-panel/btn-icons/settings.svg',
    alt: 'Settings',
  },
  {
    label: 'Stock Report',
    href: '/reports/stock_report',
    icon: '/images/main-panel/btn-icons/ItemStockReport.png',
    alt: 'Stock Report',
  },
];

function Dashboard({
  role,
  onOpenDashbord,
  onOpenBilling,
  onOpenItem,
  onExportPanel,
  onStock,
  onDueAmount,
  onOpenSales,
  onOpenUsers,
  onOpenCustomers,
  onOpenSuppliers,
  onOpenExpenses,
  onOpenFinance,
  onOpenReports,
  onStockReports,
  onOpenSettings,
}) {
  let permissionNames = [];
  try {
    permissionNames = JSON.parse(localStorage.getItem('permissions') || '[]') || [];
  } catch {
    permissionNames = [];
  }

  const hasAnyPermission = (...names) => {
    if (!Array.isArray(permissionNames) || permissionNames.length === 0) return true;
    const set = new Set(permissionNames.map((n) => String(n).toLowerCase()));
    return names.some((n) => set.has(String(n).toLowerCase()));
  };

  const pageOpeners = {
    Items: onOpenItem,
    Stock: onStock,
    Sales: onOpenSales,
    DueAmount: onDueAmount,
    Users: onOpenUsers,
    Customer: onOpenCustomers,
    Suppliers: onOpenSuppliers,
    Expenses: onOpenExpenses,
    'Finance Management': onOpenFinance,
    Reports: onOpenReports,
    Settings: onOpenSettings,
    'Export Items': onExportPanel,
    'Stock Reports': onStockReports,
  };

  const allowedLabelsByRole = {
    cashier: new Set(['Dashboard', 'Billing', 'Sales', 'Due Amount']),
  };

  const labelPermissionRules = {
    Dashboard: () => hasAnyPermission('Access_Dashbord', 'dashboards'),
    Billing: () => hasAnyPermission('Access_Billing'),
    Items: () => hasAnyPermission('Access_Items'),
    'Export Items': () => hasAnyPermission('Access_Items'),
    Stock: () => hasAnyPermission('Access_Stock'),
    Sales: () => hasAnyPermission('Access_Sales'),
    'Due Amount': () => hasAnyPermission('Access Due Amount', 'Access_Sales'),
    Users: () => hasAnyPermission('Access_Users'),
    Customer: () => hasAnyPermission('Access_Customers'),
    Suppliers: () => hasAnyPermission('Access_Suppliers'),
    Expenses: () => hasAnyPermission('Access_Expenses'),
    'Finance Management': () => hasAnyPermission('Access_Finance', 'Finance Management'),
    Reports: () => hasAnyPermission('Access_Reports'),
    Settings: () => hasAnyPermission('Access_Settings'),
    'Stock Report': () => hasAnyPermission('Generate Stock Report', 'Access_Reports'),
  };

  const itemsToRender = panelItems
    .filter((i) => (typeof labelPermissionRules[i.label] === 'function' ? labelPermissionRules[i.label]() : true))
    // keep existing cashier fallback too (if role-based restriction is needed)
    .filter((i) => (allowedLabelsByRole[role] ? allowedLabelsByRole[role].has(i.label) : true));

  return (
    <Layout showMainPanelButton={false} showPosButton={false}>
      <main
        className="flex items-center justify-center flex-grow py-8"
        style={{
          backgroundImage: "url('/images/dash-bg.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-fit h-fit py-6 xl:py-9 2xl:py-28 gap-6 text-white px-12">
          {itemsToRender.map((item) => {
            const sharedClass = 'w-[250px] max-lg:w-[200px] h-[200px] max-lg:h-[150px] text-white uppercase lg:text-xl transform transition-all duration-300 ease-in-out hover:translate-y-[-10px] hover:scale-[1.02] hover:rotate-[1deg] cardBox';
            if (item.label === 'Dashboard') {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={onOpenDashbord}
                  className={sharedClass}
                >
                  <div className="card">
                    <img
                      src={item.icon}
                      className="w-[105px] h-[105px] max-lg:w-[70px] max-lg:h-[70px]"
                      alt={item.alt}
                    />
                    <p className="panel-text">{item.label}</p>
                  </div>
                </button>
              );
            }
            if (item.label === 'Billing') {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={onOpenBilling}
                  className={sharedClass}
                >
                  <div className="card">
                    <img
                      src={item.icon}
                      className="w-[105px] h-[105px] max-lg:w-[70px] max-lg:h-[70px]"
                      alt={item.alt}
                    />
                    <p className="panel-text">{item.label}</p>
                  </div>
                </button>
              );
            }
            if (pageOpeners[item.label]) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={pageOpeners[item.label]}
                  className={sharedClass}
                >
                  <div className="card">
                    {item.icon ? (
                      <img
                        src={item.icon}
                        className="w-[105px] h-[105px] max-lg:w-[70px] max-lg:h-[70px]"
                        alt={item.alt}
                      />
                    ) : item.iconType === 'finance' ? (
                      <svg viewBox="0 0 24 24" className="w-[80px] h-[80px] max-lg:w-[60px] max-lg:h-[60px] mb-2" fill="none" aria-hidden="true">
                        <path d="M4 10h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M6 10v8M10 10v8M14 10v8M18 10v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M3 18h18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M12 4l8 4H4l8-4z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <i className={item.iconClass} />
                    )}
                    <p className="panel-text">{item.label}</p>
                  </div>
                </button>
              );
            }
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.target}
                rel={item.target === '_blank' ? 'noreferrer' : undefined}
                className={sharedClass}
              >
                <div className="card">
                  {item.icon ? (
                    <img
                      src={item.icon}
                      className="w-[105px] h-[105px] max-lg:w-[70px] max-lg:h-[70px]"
                      alt={item.alt}
                    />
                  ) : item.iconType === 'finance' ? (
                    <svg viewBox="0 0 24 24" className="w-[80px] h-[80px] max-lg:w-[60px] max-lg:h-[60px] mb-2" fill="none" aria-hidden="true">
                      <path d="M4 10h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M6 10v8M10 10v8M14 10v8M18 10v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M3 18h18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M12 4l8 4H4l8-4z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <i className={item.iconClass} />
                  )}
                  <p className="panel-text">{item.label}</p>
                </div>
              </a>
            );
          })}
        </div>
      </main>
    </Layout>
  );
}

export default Dashboard;
