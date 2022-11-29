import express from "express";

import {Login, logOut, session} from "../controllers/Auth.js"

const router = express.Router();

router.get('/session', session);
router.post('/login', Login);
router.delete('/logout', logOut);

export default router;