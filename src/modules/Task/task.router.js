import { Router } from 'express';
import TaskController from './task.controller.js';
import { TokenExtractor} from '../../middlewares/index.js';

const router = Router();

router
  .route('/')
  .get(TaskController.getAllTasks)
  .post(TokenExtractor, TaskController.createTask);

router
  .route('/:id')
  .get(TaskController.getTaskById)
  .put(TokenExtractor, TaskController.updateTask)
  .delete(TokenExtractor, TaskController.deleteTask);

export default router;
