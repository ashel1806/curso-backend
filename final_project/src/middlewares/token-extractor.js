import jwt from 'jsonwebtoken'
import ApiUtil from '../utils/api-response.util.js'
import User from '../modules/User/user.model.js'
import { HTTP_CODES } from '../common/constants/constants.js'

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')

  if (!authorization) {
    return ApiUtil.sendResponse(res, HTTP_CODES.UNAUTHORIZED, {
      message: 'You are not authorized to access this resource'
    })
  }

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    if (!token || !decodedToken.id) {
      return ApiUtil.sendResponse(res, HTTP_CODES.UNAUTHORIZED, {
        message: 'You are not authorized to access this resource'
      })
    }

    const user = await User.findById(decodedToken.id);

    req.user = user
  }

  next()
}

export default tokenExtractor
