import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan'

import TaskRouter from './src/modules/Task/task.router.js';
import UserRouter from './src/modules/User/user.router.js';
import AuthRouter from './src/modules/Auth/auth.router.js';

import logger from './src/middlewares/logger.middleware.js'

// Configuramos dotenv
config();

const app = express();

// Detectar los datos que enviamos desde el cliente
app.use(express.json());

app.use(morgan('dev'))
app.use(logger);

app.use('/auth', AuthRouter)

// Ruta para las tareas
app.use('/tasks', TaskRouter);

// Ruta para los usuarios
app.use('/users', UserRouter);

// Levantamos el servidor
const PORT = process.env.PORT | 3000;

app.listen(PORT, () => {
  console.log(`Server runnging on port ${PORT}`);
});
