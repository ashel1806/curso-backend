import TaskModel from './task.model.js';
import ApiUtil from '../../utils/api-response.util.js';
import TaskService from './task.service.js';

class TaskController {
  static async getAllTasks(req, res) {
    try {
      const allTasks = await TaskModel.getAllTasks();

      return ApiUtil.sendResponse(res, 200, allTasks);
    } catch (error) {
      return ApiUtil.sendResponse(res, 404, error);
    }
  }

  static async getTaskById(req, res) {
    try {
      const { id } = req.params;

      const taskId = parseInt(id);
      const task = await TaskModel.getTaskById(taskId);

      return ApiUtil.sendResponse(res, 200, task);
    } catch (error) {
      return ApiUtil.sendResponse(res, 404, error);
    }
  }

  static async createTask(req, res) {
    try {
      const userId = req.user.id;

      console.log(userId);
      console.log(req.body);

      const newTask = await TaskService.createTask(req.body, userId);

      return ApiUtil.sendResponse(res, 201, newTask);
    } catch (error) {
      return ApiUtil.sendResponse(res, 400, error);
    }
  }

  static async updateTask(req, res) {
    try {
      const { id } = req.params;

      const taskId = parseInt(id);
      const task = await TaskModel.updateTask(taskId, req.body);

      return ApiUtil.sendResponse(res, 200, task);
    } catch (error) {
      console.log(error);
      return ApiUtil.sendResponse(res, 400, error);
    }
  }

  static async deleteTask(req, res) {
    try {
      const { id } = req.params;

      const taskId = parseInt(id);
      const task = await TaskModel.deleteTask(taskId);

      return ApiUtil.sendResponse(res, 200, task);
    } catch (error) {
      return ApiUtil.sendResponse(res, 400, error);
    }
  }
}

export default TaskController;
