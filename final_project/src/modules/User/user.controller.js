import { HTTP_CODES } from '../../common/constants/constants.js';
import ApiUtil from '../../utils/api-response.util.js';
import UserService from './user.service.js';

class UserController {
  static async getAllUsers(req, res) {
    try {
      const { showTasks } = req.query;

      const users = await UserService.getAllUsers(showTasks);

      return ApiUtil.sendResponse(res, HTTP_CODES.OK, users);
    } catch (error) {
      return ApiUtil.sendResponse(res, HTTP_CODES.NOT_FOUND, error);
    }
  }

  static async getUserById(req, res) {
    try {
      const { showTask } = req.query;
      const { id } = req.params;

      const user = await UserService.getUserById(id, showTask);

      return ApiUtil.sendResponse(res, HTTP_CODES.OK, user);
    } catch (error) {
      return ApiUtil.sendResponse(res, HTTP_CODES.NOT_FOUND, error);
    }
  }
}

export default UserController;
