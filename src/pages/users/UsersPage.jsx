import './UsersPage.css';
import Layout from '../../components/Layout';
import { useNavigate } from 'react-router-dom';
import { hasAllPermissions } from '../../utils/permissions';

function UsersPage() {



    const navigate = useNavigate();

    // Handlers for navigation (update these as needed for your routes)
    const handleAddNewUser = () => navigate('/users/add_users');
    const handleAddNewRole = () => navigate('/users/add_role');
    const handleAddNewPermission = () => navigate('/users/add_permission');
    const handleUsersList = () => navigate('/users/user_list');
    const handleRolesList = () => navigate('/users/role_list');
    const handlePermissionList = () => navigate('/users/permission_list');

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
                    <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Users</p>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          {/* Button container */}
          <div className="w-fit max-[375px]:h-fit h-full">
            <div className="grid grid-cols-3 max-sm:grid-cols-2 max-[375px]:grid-cols-1 place-content-center [375px]:justify-items-center h-full gap-6 text-white 2xl:scale-[110%]">
              {hasAllPermissions('Access_Users', 'Add New User') && (
                <button onClick={handleAddNewUser} className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer focus:outline-none">
                  <div className="flex items-center justify-center w-10 h-10">
                    <div className="w-20 h-10" style={{background: "url('https://hypermart-new.onlinesytems.com/images/users/addNewUser.png') no-repeat", backgroundSize: 'cover'}}></div>
                  </div>
                  <p className="text-center max-sm:text-sm">Add New User</p>
                </button>
              )}
              {hasAllPermissions('Access_Users', 'Add New Role') && (
                <button onClick={handleAddNewRole} className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer focus:outline-none">
                  <div className="flex items-center justify-center w-10 h-10">
                    <div className="w-20 h-10" style={{background: "url('https://hypermart-new.onlinesytems.com/images/users/addNewRole.png') no-repeat", backgroundSize: 'cover'}}></div>
                  </div>
                  <p className="text-center max-sm:text-sm">Add New Role</p>
                </button>
              )}
              {hasAllPermissions('Access_Users', 'Add New Permission') && (
                <button onClick={handleAddNewPermission} className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer focus:outline-none">
                  <div className="flex items-center justify-center w-10 h-10">
                    <div className="w-20 h-10" style={{background: "url('https://hypermart-new.onlinesytems.com/images/users/addNewPermission.png') no-repeat", backgroundSize: 'cover'}}></div>
                  </div>
                  <p className="text-center max-sm:text-sm">Add New Permission</p>
                </button>
              )}
              {hasAllPermissions('Access_Users', 'User List View') && (
                <button onClick={handleUsersList} className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer focus:outline-none">
                  <div className="flex items-center justify-center w-10 h-10">
                    <div className="w-20 h-10" style={{background: "url('https://hypermart-new.onlinesytems.com/images/users/userList.png') no-repeat", backgroundSize: 'cover'}}></div>
                  </div>
                  <p className="text-center max-sm:text-sm">Users List</p>
                </button>
              )}
              {hasAllPermissions('Access_Users', 'Role List View') && (
                <button onClick={handleRolesList} className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer focus:outline-none">
                  <div className="flex items-center justify-center w-10 h-10">
                    <div className="w-20 h-10" style={{background: "url('https://hypermart-new.onlinesytems.com/images/users/roleList.png') no-repeat", backgroundSize: 'cover'}}></div>
                  </div>
                  <p className="text-center max-sm:text-sm">Roles List</p>
                </button>
              )}
              {hasAllPermissions('Access_Users', 'Permission List View') && (
                <button onClick={handlePermissionList} className="w-[200px] max-lg:w-[150px] border-2 border-[#1b4f72] h-[200px] max-lg:h-[150px] bg-[#3c8c2c] text-white rounded-lg flex flex-col gap-3 justify-center items-center hover:scale-90 transition-all cursor-pointer focus:outline-none">
                  <div className="flex items-center justify-center w-10 h-10">
                    <div className="w-20 h-10" style={{background: "url('https://hypermart-new.onlinesytems.com/images/users/permissionList.png') no-repeat", backgroundSize: 'cover'}}></div>
                  </div>
                  <p className="text-center max-sm:text-sm">Permission List</p>
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  
}

export default UsersPage;
