import { Router } from 'express';
import AuthController from './auth.controller.js';

const router = Router();

router.route('/signup').post(AuthController.signUp);
router.route('/login').post(AuthController.login);

export default router;
