import { Router } from 'express';
import UserController from '../controllers/user.controller.js';

const router = Router();

router
  .route('/')
  .get(UserController.getAllUsers)
  .post(UserController.createUser);

router.route('/:id').get(UserController.getUserById);

export default router;
