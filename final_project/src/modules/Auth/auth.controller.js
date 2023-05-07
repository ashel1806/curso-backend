import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserService from '../User/user.service.js';
import UserModel from '../User/user.model.js';
import ApiUtil from '../../utils/api-response.util.js';

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log(email, password)

      const user = await UserModel.getUserByEmail(email);

      console.log(user)

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      console.log(isPasswordValid)

      if (!isPasswordValid) {
        return res.status(401).json({
          message: 'Incorrect password',
        });
      }

      const payload = {
        id: user.id,
        email: user.email,
      };

      const token = jwt.sign(payload, `${process.env.JWT_SECRET}`);

      return ApiUtil.sendResponse(res, 200, {
        token,
      });
    } catch (error) {
      return ApiUtil.sendResponse(res, 500, error);
    }
  }

  static async signUp(req, res) {
    try {
      const user = await UserService.createUser(req.body)

      console.log('signUp', user)

      return ApiUtil.sendResponse(res, 201, user);
    } catch (error) {
      return ApiUtil.sendResponse(res, 400, error);
    }
  }
}

export default AuthController;
