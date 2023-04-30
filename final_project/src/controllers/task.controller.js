import TaskModel from '../models/task.model.js'

class TaskController {
  static async getAllTasks(req, res) {
    try {
      const allTasks = await TaskModel.getAllTasks()

      return res.status(200).json({ tasks: allTasks })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  static async getTaskById(req, res) {
    try {
      const { id } = req.params

      const taskId = parseInt(id)
      const task = await TaskModel.getTaskById(taskId)

      return res.status(200).json({ task })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: error.message })
    }
  }

  static async createTask(req, res) {
    try {
      const task = await TaskModel.createTask(req.body)

      return res.status(201).json({ task })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  static async updateTask(req, res) {
    try {
      const { id } = req.params

      const taskId = parseInt(id);
      const task = await TaskModel.updateTask(taskId, req.body);

      return res.status(200).json({ task })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: error.message })
    }
  }

  static async deleteTask(req, res) {
    try {
      const { id } = req.params

      const taskId = parseInt(id)
      const task = await TaskModel.deleteTask(taskId)

      return res.status(200).json({ task })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

export default TaskController
