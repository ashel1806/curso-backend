import { ValidationError } from '../../common/errors/errors.js';
import User from '../User/user.model.js';

class AuthService {
  /**
   * Función para que un usuario inicie sesión
   *
   * @param {LoginCredentials} credentials Credenciales para iniciar sesión
   *
   * @returns {Promise<string>} Token de autenticación
   */
  static async login({ email, password }) {
    // Buscamos el usuario en la base de datos
    const user = await User.findOne({ email });

    // Verificamos que la contraseña sea correcta
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    // Si la contraseña no es válida, devolvemos un error
    if (!isPasswordValid) {
      throw new ValidationError('Invalid password');
    }

    // Si la contraseña es válida, creamos el token
    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, `${process.env.JWT_SECRET}`);

    // Devolvemos el token
    return token;
  }
}

export default AuthService;

/**
 * @typedef {Object} LoginCredentials Credenciales para iniciar sesión
 *
 * @property {string} email Email del usuario
 * @property {string} password Contraseña del usuario
 */
