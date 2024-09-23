import React, { useState, useEffect } from 'react'; 
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AlertProvider } from './components/CustomAlert/AlertProvider'; 
import { fetchDatabase } from './services/AuthService';
import { fetchRoles } from './services/RoleService';
import { useUser } from './services/UserContext'; // Import the custom hook
import { registerPages } from './services/PageService';
import AppRoutes from './components/AppRoutes';
import './config/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const { connectedUser } = useUser(); // Get the connectedUser from context

  // Load the database and roles
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await fetchDatabase(); // Handle any database initialization
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
        <AppRoutes user={connectedUser} roles={roles} /> {/* Pass connectedUser to AppRoutes */}
      </AlertProvider>
    </Router>
  );
}

export default App;
