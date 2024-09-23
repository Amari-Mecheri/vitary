import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../services/UserContext'; // Import the UserContext
import PageRegistry from '../config/PageRegistry';

const AccessControlledRoute = ({ element, path, showAlert, roles }) => {
  const { connectedUser } = useUser(); // Use the connectedUser from context

  console.log("AccessControlledRoute mounted");

  useEffect(() => {
    const accessInfo = PageRegistry.getPageAccessInfo(path);
    console.log("connectedUser changed:", connectedUser);
    console.log("path:", path);

    // Check if the page requires login
    if (accessInfo?.requiresLogin) {
      if (!connectedUser) {
        showAlert("Please log in");
      } else if (connectedUser.role !== "admin") {
        const userRole = roles.find((role) => role.name === connectedUser.role);

        // If there are no roles or the user's role doesn't exist, deny access
        if (!userRole || roles.length === 0) {
          showAlert("No access to this page");
        } else if (!userRole.allowedPages.some((page) => page.page === path)) {
          showAlert("No access to this page");
        }
      }
    }
  }, [connectedUser, path, showAlert, roles]);

  const accessInfo = PageRegistry.getPageAccessInfo(path);

  // Redirect if user is already logged in and accessing /login
  if (connectedUser && path === "/login") {
    const currentUser = connectedUser?.username;
    const lastVisitedPath = localStorage.getItem(`lastVisitedPath_${currentUser}`);
    console.log("lastVisitedPath: ", lastVisitedPath);
    console.log("lastVisitedPath item: ", `lastVisitedPath_${currentUser}`);
    console.log("connectedUser: ", connectedUser);


    // Redirect to last visited page if it exists, or fallback to information page
    if (lastVisitedPath) {
      return <Navigate to={lastVisitedPath} />;
    } else {
      return <Navigate to="/information" />;
    }
  }

  // Redirect based on access checks
  if (accessInfo?.requiresLogin && !connectedUser) {
    return <Navigate to="/login" />;
  }

  if (connectedUser && connectedUser.role !== "admin") {
    const userRole = roles.find((role) => role.name === connectedUser.role);
    if (
      !userRole ||
      !userRole.allowedPages.some((page) => page.page === path)
    ) {
      return <Navigate to="/information" />;
    }
  }

  // Render the requested element if access is allowed
  return element;
};

export default AccessControlledRoute;
