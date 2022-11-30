import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/Users.js';
import { verfyUser, adminOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/users', verfyUser, adminOnly, getUsers);
router.get('/users/:id', verfyUser, adminOnly, getUserById);
router.post('/users', createUser);
router.put('/users/:id', verfyUser, adminOnly, updateUser);
router.delete('/users/:id', verfyUser, adminOnly, deleteUser);

export default router;