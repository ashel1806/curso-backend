import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import ApiUtil from '../../utils/api-response.util.js';
import UserModel from '../User/user.model.js';
import UserService from '../User/user.service.js';

class AuthController {
  static async signUp(req, res) {
    try {
      const user = await UserService.createUser(req.body);

      return ApiUtil.sendResponse(res, 201, {
        id: user.id,
        name: user.name,
        email: user.email,
        tasks: user.tasks,
      });
    } catch (error) {
      return ApiUtil.sendResponse(res, 400, error);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await UserModel.getUserByEmail(email);

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return ApiUtil.sendResponse(res, 400, {
          message: 'Incorrect Password',
        });
      }

      const payload = {
        id: user.id,
        email: user.email,
      };

      const token = jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`);

      return ApiUtil.sendResponse(res, 200, {
        token,
      });
    } catch (error) {
      return ApiUtil.sendResponse(res, 400, error);
    }
  }
}

export default AuthController;
