import React, { useState, useEffect, useMemo } from 'react'; 
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AlertProvider } from './components/CustomAlert/AlertProvider'; 
import { fetchDatabase } from './services/AuthService';
import { fetchRoles } from './services/RoleService';
import { getUserFromStorage } from './services/UserService';
import { registerPages } from './services/PageService';
import AppRoutes from './components/AppRoutes';
import './config/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);

  // Load the database and roles
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await fetchDatabase(); // This can be handled if you want to do something with the db
        const rolesData = await fetchRoles();
        setRoles(rolesData);
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        setLoading(false);
      }
    };
    initializeApp();
  }, []);

  // Get the current user from localStorage
  const user = useMemo(getUserFromStorage, []);

  // Register pages once at startup
  useEffect(() => {
    registerPages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <AlertProvider>
        <AppRoutes user={user} roles={roles} />
      </AlertProvider>
    </Router>
  );
}

export default App;
