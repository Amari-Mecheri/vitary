// src/services/PageService.js
import PageRegistry from '../config/PageRegistry';
import InformationPage from '../pages/InformationPage';
import UserManagementPage from '../pages/UserManagementPage';
import LoginPage from '../pages/LoginPage';

export const registerPages = () => {
  PageRegistry.registerPage('/user-management', UserManagementPage);
  PageRegistry.registerPage('/login', LoginPage);
  PageRegistry.registerPage('/information', InformationPage);
};
