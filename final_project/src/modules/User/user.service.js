import User from './user.model.js';

class UserService {
  /**
   * Función para obtener todos los usuarios de la BD
   *
   * @param {boolean} showTasks Verifica si queremos mostrar información de las tareas
   *
   * @returns {Promise<User[]>} Promesa con el arreglo de usuarios
   */
  static async getAllUsers(showTasks) {
    try {
      let users = [];

      // Si showTasks es false no mostramos la información de las tareas
      if (!showTasks) {
        users = await User.find({});

        return users;
      }

      // Si showTasks es true, mostramos las tareas con su información
      users = await User.find({}).populate({
        path: 'tasks',
        select: 'title description done -_id',
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Función para obtener un usuario
   *
   * @param {string} id Id del usuario que desamos obtener
   * @param {boolean} showTask Verifica si queremos mostrar información de la tarea
   *
   * @returns {Promise<User>}
   */
  static async getUserById(id, showTask) {
    try {
      let user = null;

      // Si showTask es false no mostramos la información de la tarea
      if (!showTask) {
        user = await User.findById(id);

        return user;
      }

      // Si showTask es true, mostramos la información de la tarea
      user = await User.findById(id).populate({
        path: 'tasks',
        select: 'title description done -_id',
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Función para crear un nuevo usuario
   *
   * @param {User} user Información del usuario a crear
   *
   * @returns {Promise<User>} Promesa con el nuevo usuario creado
   */
  static async createUser(user) {
    try {
      const newUser = await User.create(user);

      // Devolvemos el usuario creado
      return newUser;
    } catch (error) {
      // Si hay un error, lo lanzamos
      throw error;
    }
  }
}

export default UserService;

/* IGNORAR ESTO, ES SOLO PARA LA DOCUMENTACION */

/**
 * @typedef {Object} Task
 * @property {number} id - Id de la tarea
 * @property {string} title - Título de la tarea
 * @property {string} description - Descripción de la tarea
 * @property {boolean} done - Estado de la tarea
 *
 */

/**
 * @typedef {Object} User
 * @property {number} id - Id del usuario
 * @property {string} name - Nombre del usuario
 * @property {string} email - Email del usuario
 * @property {Array<string | Task>} tasks - Arreglo con los ids de las tareas del usuario
 */
