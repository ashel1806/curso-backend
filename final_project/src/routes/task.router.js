import { Router } from 'express'
import TaskController from '../controllers/task.controller.js'

const router = Router()

router.route('/')
  .get(TaskController.getAllTasks)
  .post(TaskController.createTask)

router.route('/:id')
  .get(TaskController.getTaskById)
  .put(TaskController.updateTask)
  .delete(TaskController.deleteTask)

export default router
