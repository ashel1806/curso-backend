import { HTTP_CODES } from '../../common/constants/constants.js';
import ApiUtil from '../../utils/api-response.util.js';
import UserService from './user.service.js';

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const { showTasks } = req.query;

      const users = await UserService.getAllUsers(showTasks);

      return ApiUtil.sendResponse(res, HTTP_CODES.OK, users);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const { showTask } = req.query;
      const { id } = req.params;

      const user = await UserService.getUserById(id, showTask);

      return ApiUtil.sendResponse(res, HTTP_CODES.OK, user);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
