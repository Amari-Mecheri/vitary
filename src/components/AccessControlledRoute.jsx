import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../services/AuthService';
import PageRegistry from '../config/PageRegistry';

const AccessControlledRoute = ({ element, path, showAlert, roles }) => {
  const user = getCurrentUser();

  useEffect(() => {
    const accessInfo = PageRegistry.getPageAccessInfo(path);

    // Check if the page requires login
    if (accessInfo?.requiresLogin) {
      if (!user) {
        showAlert('Please log in');
      } else if (user.role !== 'admin') {
        const userRole = roles.find(role => role.name === user.role);

        // If there are no roles or the user's role doesn't exist, deny access
        if (!userRole || roles.length === 0) {
          showAlert('No access to this page');
        } else if (!userRole.allowedPages.some(page => page.page === path)) {
          showAlert('No access to this page');
        }
      }
    }
  }, [user, path, showAlert, roles]);

  const accessInfo = PageRegistry.getPageAccessInfo(path);

  // Redirect based on access checks
  if (accessInfo?.requiresLogin && !user) {
    return <Navigate to="/login" />;
  }

  if (user && user.role !== 'admin') {
    const userRole = roles.find(role => role.name === user.role);
    if (!userRole || !userRole.allowedPages.some(page => page.page === path)) {
      return <Navigate to="/information" />;
    }
  }

  // If all checks pass, render the requested element
  return element;
};

export default AccessControlledRoute;
