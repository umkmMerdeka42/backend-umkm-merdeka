import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/Users.js';
import { verfyUser, adminOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/users', verfyUser, adminOnly, getUsers);
router.get('/users/:id', verfyUser, getUserById);
router.post('/users', createUser);
router.put('/users/:id', verfyUser, updateUser);
router.delete('/users/:id', verfyUser, adminOnly, deleteUser);

export default router;
