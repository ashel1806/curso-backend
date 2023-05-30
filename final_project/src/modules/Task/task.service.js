import User from '../User/user.model.js';
import Task from './task.model.js';

class TaskService {
  /**
   * Función para obtener todas las tareas
   *
   * @param {boolean} showUsers Indica si se debe devolver la información de las usuarios
   *
   * @returns {Promise<Task[]>} Array con todas las tareas
   */
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
        select: 'username email -_id',
      });

      return allTasks;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Función para obtener una tarea por su id
   *
   * @param {string} id Id de la tarea a buscar
   * @param {boolean} showUser Indica si se debe devolver la información del usuario que creó la tarea
   *
   * @returns {Promise<Task>} Tarea encontrada
   */
  static async getTaskById(id, showUser) {
    try {
      let task = null;

      // Si showUser es false, devolvemos la tarea sin la información del usuario
      if (!showUser) {
        task = await Task.findById(id);

        return task;
      }

      // Si showUser es true, devolvemos la tarea con la información del usuario
      task = await Task.findById(id).populate({
        path: 'user',
        select: 'username email -_id',
      });

      return task;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Función para actualizar una tarea
   *
   * @param {string} id Id de la tarea que se actualizará
   * @param {Task} task Objeto con la nueva información de la tarea
   *
   * @returns {Promise<Task>} Tarea actualizada
   */
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

  /**
   * Función para eliminar una tarea
   *
   * @param {string} id Id de la tarea que se eliminará
   *
   * @returns {Promise<Object>}
   */
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
      await User.updateOne(
        { _id: user.id },
        {
          $push: {
            tasks: newTask.id,
          },
        }
      );

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
