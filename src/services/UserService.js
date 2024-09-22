// src/services/UserService.js
import * as Database from '../db/Database';

export const fetchRoles = async () => {
  const db = await Database.get();
  return db.roles.find().exec();
};

export const getUserFromStorage = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};
