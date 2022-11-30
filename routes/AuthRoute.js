import express from 'express';

import { login, logout, session } from '../controllers/Auth.js';

const router = express.Router();

router.get('/session', session);
router.post('/login', login);
router.delete('/logout', logout);

export default router;
