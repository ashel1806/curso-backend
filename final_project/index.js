import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';

import TaskRouter from './src/modules/Task/task.router.js';
import UserRouter from './src/modules/User/user.router.js';
import AuthRouter from './src/modules/Auth/auth.router.js';

import { bodyLogger } from './src/middlewares/logger.js';

// Configuramos dotenv
config();

const app = express();

/////////////////
// MIDDLEWARES //
/////////////////

// Detectar los datos que enviamos desde el cliente
app.use(express.json());

// Configuramos morgan para que nos muestre los logs de las peticiones
app.use(morgan('dev'));

// Configuramos nuestro middleware para que nos muestre los datos
// que enviamos en el body
app.use(bodyLogger);

////////////
// ROUTES //
////////////

// Ruta para la autenticación
app.use('/auth', AuthRouter);

// Ruta para las tareas
app.use('/tasks', TaskRouter);

// Ruta para los usuarios
app.use('/users', UserRouter);


///////////////
// SERVER UP //
///////////////

// Levantamos el servidor
const PORT = process.env.PORT | 3000;

app.listen(PORT, () => {
  console.log(`Server runnging on port ${PORT}`);
});
