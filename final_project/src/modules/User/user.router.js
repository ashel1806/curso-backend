import { Router } from 'express';
import UserController from './user.controller.js';

const router = Router();

router
  .route('/')
  .get(UserController.getAllUsers)

router.route('/:id').get(UserController.getUserById);

export default router;
