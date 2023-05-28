import User from '../User/user.model.js';
import Task from './task.model.js';

class TaskService {
  static async getAllTasks(showUsers) {
    try {
      let allTasks = [];

      // Si showUsers es false, devolvemos las tareas sin la información del usuario
      if (!showUsers) {
        allTasks = await Task.find({});

        return allTasks;
      }

      // Si showUsers es true, devolvemos las tareas con la información del usuario
      allTasks = await Task.find({}).populate({
        path: 'user',
        select: 'username email -_id'
      });

      return allTasks;
    } catch (error) {
      throw error;
    }
  }

  static async getTaskById(id, showUser) {
    try {
      let task = null;

      if (!showUser) {
        task = await Task.findById(id);

        return task;
      }

      task = await Task.findById(id).populate('user', {
        name: 1,
        email: 1,
      });

      return task;
    } catch (error) {
      throw error;
    }
  }

  static async updateTask(id, task) {
    try {
      const updatedTask = await Task.findByIdAndUpdate(id, task, {
        new: true,
      });

      return updatedTask;
    } catch (error) {
      throw error;
    }
  }

  static async deleteTask(id) {
    try {
      await Task.deleteOne({ _id: id });

      return {};
    } catch (error) {
      throw error;
    }
  }

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
      const user = await User.findById(userId);

      // Creamos la tarea
      const newTask = await Task.create({
        ...task,
        user: user.id,
      });

      // Asignamos la tarea al usuario
      user.tasks = user.tasks.concat(newTask.id);

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
