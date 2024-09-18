import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import Card from './components/Card/Card';
import InputField from './components/InputField/InputField';
import Button from './components/Button/Button';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import DynamicLabel from './components/DynamicLabel/DynamicLabel';
import './Login.css';
import { useTranslation } from 'react-i18next';
import * as Database from './Database'; // Import Database

const Login = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorKey, setErrorKey] = useState(''); // Store error key instead of message
  const [db, setDb] = useState(null);

  // Fetch the database on component mount
  useEffect(() => {
    const fetchDb = async () => {
      const database = await Database.get();
      setDb(database);
    };
    fetchDb();
  }, []);

  const handleLogin = async () => {
    if (!db) return; // If DB is not loaded, return

    try {
      const user = await db.users.findOne({
        selector: { _id: username } // Match username with _id
      }).exec();

      if (user && bcrypt.compareSync(password, user.password)) {
        alert(t('login_success'));
      } else {
        setErrorKey('invalid_credentials'); // Set the error key, not the actual message
      }
    } catch (err) {
      setErrorKey('invalid_credentials'); // Set the error key
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Card title={<DynamicLabel id="login" />} opacity={0.85}> {/* Use DynamicLabel for card title */}
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
            {errorKey && <p className="error-text">{t(errorKey)}</p>} {/* Dynamic error message */}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
