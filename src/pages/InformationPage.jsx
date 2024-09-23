import React from 'react';
import MenuItem from '../components/Navbar/MenuItem'; // Adjust the import path if necessary
import './InformationPage.css';

const InformationPage = ({ showAlert }) => {
  return (
    <div>
      <h1>Welcome to Vitary</h1>
      <button onClick={() => showAlert("This is an alert!")}>
        Show Alert
      </button>

      <h2>Menu Item Test</h2>
      <ul>
        <MenuItem path="/some-path" label="User" icon="user-icon.png" />
        {/* You can add more MenuItem instances for testing */}
      </ul>
    </div>
  );
};

InformationPage.getAccessInfo = () => ({
  requiresLogin: true,
  permissions: []
});

export default InformationPage;
