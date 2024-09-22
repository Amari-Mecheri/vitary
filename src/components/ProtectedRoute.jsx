import React from 'react';
import { Navigate } from 'react-router-dom';
import PageRegistry from '../config/PageRegistry';

function ProtectedRoute({ user, children, path }) {
  const accessInfo = PageRegistry.getPageAccessInfo(path);

  if (!accessInfo) {
    return <Navigate to="/information" />;
  }

  if (accessInfo.requiresLogin && !user) {
    return <Navigate to="/login" />;
  }

  if (user && user.role === 'admin') {
    return children;
  }

  if (user && accessInfo.allowedRoles.includes(user.role)) {
    return children;
  }

  return <Navigate to="/information" />;
}

export default ProtectedRoute;
