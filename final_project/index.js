import express from 'express'
import TaskRouter from './src/routes/task.router.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/tasks', TaskRouter)

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server runnging on port ${PORT}`)
})
