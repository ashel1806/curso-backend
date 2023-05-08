import UserModel from './user.model.js';
import TaskModel from '../Task/task.model.js';
import bcrypt from 'bcrypt';

import { SALT_ROUNDS } from '../../common/constans.js';

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
      const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);

      const newUser = await UserModel.createUser({
        ...user,
        tasks: [],
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
