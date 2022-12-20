import express from 'express';

const router = express.Router();

import { register } from '../controller/authController.js';

router.use((req, res, next) => {
  console.log('Auth route');
  next();
});

router.route('/register').post(register);

export default router;
