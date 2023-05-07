import TaskModel from './task.model.js';
import UserModel from '../User/user.model.js';

class TaskService {
  /**
   * Función que permite crear una tarea y asignarla a un usuario
   *
   * @param {Task} task - Objeto con la información de la tarea
   * @param {number} userId - Id del usuario al que se le asignará la tarea
   *
   * @returns {Promise<Task>} Promesa que resuelve a un objeto con la información de la tarea
  */
  static async createTask(task, userId) {
    try {
      // Obtenemos el usuario al que le asignaremos la tarea
      const user = await UserModel.getUserById(userId);

      // Creamos la tarea
      const newTask = await TaskModel.createTask(task);

      // Asignamos la tarea al usuario
      user.tasks.push(newTask.id);

      // Devolvemos la tarea creada
      return newTask;
    } catch (error) {
      // Si hay un error, lo lanzamos
      throw error;
    }
  }
}

export default TaskService;


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
