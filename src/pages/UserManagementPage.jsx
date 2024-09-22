const UserManagementPage = () => {
    return (
      <div>
        <h1>User Management</h1>
      </div>
    );
  }
  
  UserManagementPage.getAccessInfo = () => ({
    requiresLogin: true,  // Only accessible to logged-in users
    permissions: ['create_user', 'delete_user']  // Requires specific permissions
  });
  
  export default UserManagementPage;
  