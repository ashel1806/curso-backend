import TaskModel from './task.model.js';
import ApiUtil from '../../utils/api-response.util.js';
import TaskService from './task.service.js';
import Task from './task.model.js';
import { HTTP_CODES } from '../../common/constants/constants.js';

class TaskController {
  static async getAllTasks(req, res) {
    try {
      const { showUsers } = req.query;
      const allTasks = await TaskService.getAllTasks(showUsers);

      return ApiUtil.sendResponse(res, HTTP_CODES.OK, allTasks);
    } catch (error) {
      return ApiUtil.sendResponse(res, HTTP_CODES.NOT_FOUND, error);
    }
  }

  static async getTaskById(req, res) {
    try {
      const { id } = req.params;

      const task = await Task.findById(id);

      return ApiUtil.sendResponse(res, HTTP_CODES.OK, task);
    } catch (error) {
      return ApiUtil.sendResponse(res, HTTP_CODES.NOT_FOUND, error);
    }
  }

  static async createTask(req, res) {
    try {
      const { ...task } = req.body;
      const userId = req.user.id;

      const newTask = await TaskService.createTask(task, userId);

      return ApiUtil.sendResponse(res, HTTP_CODES.CREATE, newTask);
    } catch (error) {
      return ApiUtil.sendResponse(res, HTTP_CODES.BAD_REQUEST, error);
    }
  }

  static async updateTask(req, res) {
    try {
      const { id } = req.params;

      const task = await TaskService.updateTask(id, req.body);

      return ApiUtil.sendResponse(res, HTTP_CODES.OK, task);
    } catch (error) {
      return ApiUtil.sendResponse(res, HTTP_CODES.BAD_REQUEST, error);
    }
  }

  static async deleteTask(req, res) {
    try {
      const { id } = req.params;

      const task = await TaskService.deleteTask(id)

      return ApiUtil.sendResponse(res, HTTP_CODES.OK, task);
    } catch (error) {
      return ApiUtil.sendResponse(res, HTTP_CODES.BAD_REQUEST, error);
    }
  }
}

export default TaskController;
