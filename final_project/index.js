import express from 'express';
import TaskRouter from './src/routes/task.router.js';
import UserRouter from './src/routes/user.router.js';
import { config } from 'dotenv';

const app = express();

// Configuramos dotenv
config();

// Detectar los datos que enviamos desde el cliente
app.use(express.json());

// Ruta para las tareas
app.use('/tasks', TaskRouter);

// Ruta para los usuarios
app.use('/users', UserRouter);

// Levantamos el servidor
const PORT = process.env.PORT | 3000;

app.listen(PORT, () => {
  console.log(`Server runnging on port ${PORT}`);
});
