import jwt from 'jsonwebtoken'
import UserModel from '../modules/User/user.model.js'
import ApiUtil from '../utils/api-response.util.js'

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')

  if (!authorization) {
    return ApiUtil.sendResponse(res, 401, {
      message: 'You are not authorized to access this resource'
    })
  }

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    if (!token || !decodedToken.id) {
      return ApiUtil.sendResponse(res, 401, {
        message: 'You are not authorized to access this resource'
      })
    }

    const user = await UserModel.getUserById(decodedToken.id)

    req.user = user
  }

  next()
}

export default tokenExtractor
