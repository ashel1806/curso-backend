import { Router } from 'express';
import TaskController from './task.controller.js';
import tokenExtractor from '../../middlewares/token-extractor.js';

const router = Router();

router
  .route('/')
  .get(TaskController.getAllTasks)
  .post(tokenExtractor, TaskController.createTask);

router
  .route('/:id')
  .get(TaskController.getTaskById)
  .put(tokenExtractor, TaskController.updateTask)
  .delete(tokenExtractor, TaskController.deleteTask);

export default router;
