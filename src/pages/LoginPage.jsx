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
import { useUser } from '../services/UserContext';

const LoginPage = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorKey, setErrorKey] = useState('');
  const [db, setDb] = useState(null);
  const { setConnectedUser } = useUser();

  // Fetch the database on component mount
  useEffect(() => {
    const fetchDb = async () => {
      const database = await Database.get();
      setDb(database);
    };
    fetchDb();
  }, []);

  const handleLogin = async () => {
    if (!db) {
      console.log('Database not loaded yet');
      return;
    }

    try {
      const user = await db.users.findOne({
        selector: { _id: username }
      }).exec();

      if (user && bcrypt.compareSync(password, user.password)) {
        console.log('Login successful');

        // Login successful, store user details in context
        const loggedInUser = {
          username: user._id,
          role: user.role
        };

        console.log('Setting connected user:', loggedInUser);
        setConnectedUser(loggedInUser); // Use context

        // No manual navigation, expect routing to trigger automatically
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
