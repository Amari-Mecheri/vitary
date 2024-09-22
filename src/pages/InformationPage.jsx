import React from 'react';
import './InformationPage.css'

const InformationPage = ({ showAlert }) => {
  return (
    <div>
      <h1>Welcome to Vitary</h1>
      <button onClick={() => showAlert("This is an alert!")}>
        Show Alert
      </button>
    </div>
  );
};


InformationPage.getAccessInfo = () => ({
  requiresLogin: true,
  permissions: []
});

export default InformationPage;
