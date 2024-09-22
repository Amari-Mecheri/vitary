import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageRegistry from '../config/PageRegistry';
import { getCurrentUser } from '../services/AuthService';
import AccessControlledRoute from './AccessControlledRoute';
import NotFoundPage from '../pages/NotFoundPage';
import MainLayout from '../layouts/MainLayout';
import CustomModal from '../components/CustomModal/CustomModal'; // Import your custom modal
import { fetchRoles } from '../services/RoleService';

function AppRoutes() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = getCurrentUser();
  const [roles, setRoles] = useState([]);

  const showAlert = useCallback((message) => {
    setAlertMessage(message);
    setIsModalVisible(true);
  }, []);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchRolesData = async () => {
      try {
        const fetchedRoles = await fetchRoles();
        setRoles(fetchedRoles);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRolesData();
  }, []);

  if (loading) {
    return <div>{t('loading')}...</div>;
  }

  return (
    <>
      {/* Using the custom modal component */}
      <CustomModal show={isModalVisible} handleClose={closeModal} message={alertMessage} />

      <Routes>
        {PageRegistry.getAllPages().map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={
              <AccessControlledRoute
                element={
                  page.path !== '/login' && page.path !== '*' ? (
                    <MainLayout>
                      <page.component showAlert={showAlert} />
                    </MainLayout>
                  ) : (
                    <page.component showAlert={showAlert} />
                  )
                }
                path={page.path}
                showAlert={showAlert}
                roles={roles} // Pass the fetched roles to AccessControlledRoute
              />
            }
          />
        ))}
        <Route path="/" element={user ? <Navigate to="/information" /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
