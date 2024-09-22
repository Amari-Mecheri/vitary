// src/services/AuthService.js
import * as Database from '../db/Database';

export const fetchDatabase = async () => {
  const database = await Database.get();
  return database;
};

export const getCurrentUser = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};
