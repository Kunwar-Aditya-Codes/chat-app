import express from 'express';

const router = express.Router();

import { register, login } from '../controller/authController.js';

router.use((req, res, next) => {
  console.log('Auth route');
  next();
});

router.route('/register').post(register);

router.route('/login').post(login);

export default router;
