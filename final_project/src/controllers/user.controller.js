import ApiUtil from '../utils/api-response.util.js';
import UserModel from '../models/user.model.js';
import TaskService from '../services/task.service.js';

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAllUsers();

      return ApiUtil.sendResponse(res, 200, users);
    } catch (error) {
      return ApiUtil.sendResponse(res, 404, error);
    }
  }

  static async getUserById(req, res) {
    try {
      const { tasks } = req.query;
      const { id } = req.params;

      const userId = parseInt(id);

      const user = tasks
        ? await TaskService.getTasksByUserId(userId)
        : await UserModel.getUserById(userId);

      return ApiUtil.sendResponse(res, 200, user);
    } catch (error) {
      return ApiUtil.sendResponse(res, 404, error);
    }
  }

  static async createUser(req, res) {
    try {
      const user = await UserModel.createUser(req.body);

      return ApiUtil.sendResponse(res, 201, user);
    } catch (error) {
      return ApiUtil.sendResponse(res, 400, error);
    }
  }
}

export default UserController;
