import bcrypt from 'bcrypt';
import UserModel from './user.model.js';
import TaskModel from '../Task/task.model.js';

class UserService {
  /**
   * Función que permite obtener todas las tareas de un usuario su id
   *
   * @param {number} userId - Id del usuario del cual vamos a buscar las tareas
   *
   * @returns {Promise<UserWithTasks>} Promesa que resuelve a un objeto con la
   * información del usuario y sus tareas
   */
  static async getTasksByUserId(userId) {
    try {
      // Obtenemos el usuario
      const user = await UserModel.getUserById(userId);

      // Obtenemos las tareas del usuario
      const tasks = await Promise.all(
        user.tasks.map((taskId) => TaskModel.getTaskById(taskId))
      );

      // Devolvemos el usuario con sus tareas
      return { ...user, tasks };
    } catch (error) {
      // Si hay un error, lo lanzamos
      throw error;
    }
  }

  static async createUser(user) {
    try {
      // Constante que define el número de saltos que dará el algoritmo
      // para generar el hash
      const SALT_ROUNDS = 10;

      // Encriptamos la contraseña
      const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);

      // Creamos el usuario con la contraseña encriptada
      const newUser = await UserModel.createUser({
        ...user,
        tasks: [],
        password: hashedPassword,
      });

      console.log(newUser)
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
 * @property {Array<number>} tasks - Arreglo con los ids de las tareas del usuario
 */

/**
 * @typedef {Object} UserWithTasks
 * @property {number} id - Id del usuario
 * @property {string} name - Nombre del usuario
 * @property {string} email - Email del usuario
 * @property {Array<Task>} tasks - Arreglo con las tareas del usuario
 */

