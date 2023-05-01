import { tasks as data } from '../../data.js';

class TaskModel {
  /* Función que devuelve todas las tareas */
  static getAllTasks() {
    return new Promise((resolve, reject) => {
      // Si el arreglo de tareas está vacío, rechazamos la promesa
      // con un mensaje de error: 'No tasks found'
      if (!data.length) {
        reject({
          message: 'No tasks found',
        });
      }

      // Si el arreglo de tareas no está vacío, resolvemos la promesa
      resolve(data);
    });
  }

  /* Función que devuelve una tarea por su id */
  static getTaskById(id) {
    return new Promise((resolve, reject) => {
      // Buscamos la tarea en el arreglo de tareas
      const task = data.find((task) => task.id === id);

      // Si no encontramos la tarea, rechazamos la promesa
      if (!task) {
        reject({
          message: 'No task found',
        });
      }

      // Si encontramos la tarea, resolvemos la promesa
      resolve(task);
    });
  }

  static createTask(task) {
    return new Promise((resolve, reject) => {
      // Si no hay título o descripción, rechazamos la promesa
      if (!task.title || !task.description) {
        reject({
          message: 'Missing title or description',
        });
        return;
      }

      // Si hay título y descripción, creamos la tarea, asignandole un id
      // y el estado de 'done' en false
      const newTask = {
        id: data.length + 1,
        done: false,
        ...task,
      };

      // Agregamos la tarea al arreglo de tareas
      data.push(newTask);

      // Resolvemos la promesa con la tarea creada
      resolve(newTask);
    });
  }

  /* Función que actualiza una tarea por su id */
  static updateTask(id, task) {
    return new Promise((resolve, reject) => {
      // Buscamos la tarea en el arreglo de tareas
      const taskToUpdate = data.find((task) => task.id === id);

      // Si no encontramos la tarea, rechazamos la promesa
      if (!taskToUpdate) {
        reject({
          message: 'No task found',
        });
        return;
      }

      // Si encontramos la tarea, actualizamos la tarea usando el spread operator
      const updatedTask = {
        ...taskToUpdate,
        ...task,
      };

      // Actualizamos la tarea en el arreglo de tareas.
      // Eliminamos la tarea anterior y agregamos la tarea actualizada
      data.splice(id - 1, 1, updatedTask);

      // Resolvemos la promesa con la tarea actualizada
      resolve(updatedTask);
    });
  }

  /* Función que elimina una tarea por su id */
  static deleteTask(id) {
    return new Promise((resolve, reject) => {
      // Buscamos el índice de la tarea en el arreglo de tareas
      // Si no se encuentra la tarea, el índice será -1
      const index = data.findIndex((task) => task.id === id);

      // Si no encontramos la tarea, rechazamos la promesa
      if (index === -1) {
        reject({
          message: 'No task found',
        });
        return;
      }

      // Si encontramos la tarea, la eliminamos del arreglo de tareas
      data.splice(index, 1);

      // Resolvemos la promesa con un mensaje de éxito
      resolve({ message: 'Task deleted successfully' });
    });
  }
}

export default TaskModel;
