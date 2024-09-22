import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import Card from '../components/Card/Card';
import InputField from '../components/InputField/InputField';
import Button from '../components/Button/Button';
import LanguageSelector from '../components/LanguageSelector/LanguageSelector';
import DynamicLabel from '../components/DynamicLabel/DynamicLabel';
import './LoginPage.css';
import { useTranslation } from 'react-i18next';
import * as Database from '../db/Database';
import { useNavigate } from 'react-router-dom'; // For navigation

const LoginPage = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorKey, setErrorKey] = useState('');
  const [db, setDb] = useState(null);
  const navigate = useNavigate(); // For programmatic navigation

  // Fetch the database on component mount
  useEffect(() => {
    const fetchDb = async () => {
      const database = await Database.get();
      setDb(database);
    };
    fetchDb();
  }, []);

  const handleLogin = async () => {
    if (!db) return;

    try {
      const user = await db.users.findOne({
        selector: { _id: username } // Match username with _id
      }).exec();

      if (user && bcrypt.compareSync(password, user.password)) {
        // Login successful, store user details in localStorage
        const loggedInUser = {
          username: user._id,
          role: user.role // Assuming 'role' is stored in the user document
        };
        localStorage.setItem('user', JSON.stringify(loggedInUser)); // Store user in localStorage

        // Redirect to the dashboard or another protected page
        navigate('/dashboardlayout');
      } else {
        setErrorKey('invalid_credentials');
      }
    } catch (err) {
      setErrorKey('invalid_credentials');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Card title={<DynamicLabel id="login" />} opacity={0.85}>
          <LanguageSelector />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <InputField
              label={<DynamicLabel id="username" />}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
              label={<DynamicLabel id="password" />}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="login-btn" fullWidth>
              <DynamicLabel id="login" />
            </Button>
            {errorKey && <p className="error-text">{t(errorKey)}</p>}
          </form>
        </Card>
      </div>
    </div>
  );
};

LoginPage.getAccessInfo = () => ({
  requiresLogin: false, // Public page
  permissions: []
});

export default LoginPage;
