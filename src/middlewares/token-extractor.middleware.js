import jwt from 'jsonwebtoken';
import ApiUtil from '../utils/api-response.util.js';
import UserModel from '../modules/User/user.model.js';

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization');

  if (!authorization) {
    return ApiUtil.sendResponse(res, 401, {
      message: 'You are not authorized',
    });
  }

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);

    const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);

    if (!token || !decodedToken.id) {
      return ApiUtil.sendResponse(res, 401, {
        message: 'Token missing or invalid',
      });
    }

    const user = await UserModel.getUserById(decodedToken.id);

    req.user = user;
  }

  next();
};

export default tokenExtractor;
