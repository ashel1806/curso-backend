import TaskModel from './task.model.js';
import ApiUtil from '../../utils/api-response.util.js';
import TaskService from './task.service.js';
import Task from './task.model.js';
import { HTTP_CODES } from '../../common/constants/constants.js';

class TaskController {
  static async getAllTasks(req, res, next) {
    try {
      const { showUsers } = req.query;
      const allTasks = await TaskService.getAllTasks(showUsers);

      return ApiUtil.sendResponse(res, HTTP_CODES.OK, allTasks);
    } catch (error) {
      next(error);
    }
  }

  static async getTaskById(req, res, next) {
    try {
      const { id } = req.params;

      const task = await TaskService.getTaskById(id);

      return ApiUtil.sendResponse(res, HTTP_CODES.OK, task);
    } catch (error) {
      next(error);
    }
  }

  static async createTask(req, res, next) {
    try {
      const { ...task } = req.body;
      const userId = req.user.id;

      const newTask = await TaskService.createTask(task, userId);

      return ApiUtil.sendResponse(res, HTTP_CODES.CREATE, newTask);
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(req, res, next) {
    try {
      const { id } = req.params;

      const task = await TaskService.updateTask(id, req.body);

      return ApiUtil.sendResponse(res, HTTP_CODES.OK, task);
    } catch (error) {
      next(error);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      const { id } = req.params;

      const task = await TaskService.deleteTask(id)

      return ApiUtil.sendResponse(res, HTTP_CODES.OK, task);
    } catch (error) {
      next(error);
    }
  }
}

export default TaskController;
