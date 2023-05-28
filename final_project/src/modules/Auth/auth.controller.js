import ApiUtil from '../../utils/api-response.util.js';
import { HTTP_CODES } from '../../common/constants/constants.js';
import UserService from '../User/user.service.js';
import AuthService from './auth.service.js';

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login({ email, password });

      return ApiUtil.sendResponse(res, HTTP_CODES.OK, {
        token,
      });
    } catch (error) {
      console.log(error);
      return ApiUtil.sendResponse(res, HTTP_CODES.BAD_REQUEST, error);
    }
  }

  static async signUp(req, res) {
    try {
      const user = await UserService.createUser(req.body);

      return ApiUtil.sendResponse(res, HTTP_CODES.CREATE, user);
    } catch (error) {
      return ApiUtil.sendResponse(res, HTTP_CODES.BAD_REQUEST, error);
    }
  }
}

export default AuthController;
