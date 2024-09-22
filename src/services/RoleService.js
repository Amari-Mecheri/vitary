// src/services/RoleService.js
import * as Database from '../db/Database';

export const fetchRoles = async () => {
  const db = await Database.get();
  return await db.roles.find().exec();
};
