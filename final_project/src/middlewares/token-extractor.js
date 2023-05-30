import jwt from 'jsonwebtoken';
import UserService from '../modules/User/user.service.js';
import { UnauthorizedError } from '../common/errors/errors.js';

/**
 * Función middleware que extrae el token del header de la petición y lo decodifica
 * para obtener el usuario que hizo la petición.
 *
 * @param {Request} req Petición HTTP que se ha relaizado
 * @param {Response} res Respuesta HTTP que se enviará
 * @param {Function} next Función que llama al siguiente middleware
 */
const tokenExtractor = async (req, res, next) => {
  // Obtenemos el header de autorización de la petición
  const authorization = req.get('authorization');

  // Si no hay header de autorización, devolvemos un error
  if (!authorization) {
    throw new UnauthorizedError(
      'You are not authorized to access this resource'
    );
  }

  // Si el header de autorización existe, extraemos el token
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    // Extraemos el token del header de autorización
    const token = authorization.substring(7);

    // Decodificamos el token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Si el token no existe o no tiene un id, devolvemos un error
    if (!token || !decodedToken.id) {
      throw new UnauthorizedError(
        'You are not authorized to access this resource'
      );
    }

    // Si el token existe y tiene un id, buscamos el usuario en la base de datos
    const user = await UserService.getUserById(decodedToken.id);

    // Asignamos el usuario a la petición
    req.user = user;
  }

  // Llamamos al siguiente middleware
  next();
};

export default tokenExtractor;
