import ApiUtil from '../../utils/api-response.util.js';
import { HTTP_CODES } from '../../common/constants/constants.js';
import UserService from '../User/user.service.js';
import AuthService from './auth.service.js';

class AuthController {
  // Método para que un usuario inicie sesión
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login({ email, password });

      return ApiUtil.sendResponse(res, HTTP_CODES.OK, { token });
    } catch (error) {
      next(error);
    }
  }

  // Método para que un usario se registre en la aplicación
  static async signUp(req, res, next) {
    try {
      const user = await UserService.createUser(req.body);

      return ApiUtil.sendResponse(res, HTTP_CODES.CREATE, user);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
