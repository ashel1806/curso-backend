import ApiUtil from '../../utils/api-response.util.js';
import UserModel from './user.model.js';
import UserService from './user.service.js';

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
        ? await UserService.getTasksByUserId(userId)
        : await UserModel.getUserById(userId);

      return ApiUtil.sendResponse(res, 200, user);
    } catch (error) {
      return ApiUtil.sendResponse(res, 404, error);
    }
  }
}

export default UserController;
