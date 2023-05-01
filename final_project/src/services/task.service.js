import TaskModel from '../models/task.model.js';
import UserModel from '../models/user.model.js';

class TaskService {
  static async createTask(task, userId) {
    try {
      const user = await UserModel.getUserById(userId);
      const newTask = await TaskModel.createTask(task);

      user.tasks.push(newTask.id);

      return newTask;
    } catch (error) {
      throw error;
    }
  }

  static async getTasksByUserId(userId) {
    try {
      const user = await UserModel.getUserById(userId);

      const tasks = await Promise.all(
        user.tasks.map((taskId) => TaskModel.getTaskById(taskId))
      );

      return { ...user, tasks };
    } catch (error) {
      throw error;
    }
  }
}

export default TaskService;
