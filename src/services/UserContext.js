import React, { useState, useEffect, createContext, useContext } from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [connectedUser, setConnectedUser] = useState(null);

  useEffect(() => {
    // Load the user from localStorage when the app starts (if any)
    const storedUser = localStorage.getItem('connectedUser');
    if (storedUser) {
      setConnectedUser(JSON.parse(storedUser));
    }
  }, []);

  // Save the user to localStorage whenever it changes
  useEffect(() => {
    if (connectedUser) {
      localStorage.setItem('connectedUser', JSON.stringify(connectedUser));
    } else {
      localStorage.removeItem('connectedUser');
    }
  }, [connectedUser]);

  return (
    <UserContext.Provider value={{ connectedUser, setConnectedUser }}>
      {children}
    </UserContext.Provider>
  );
};
