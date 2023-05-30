import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ConnectionError } from '../common/errors/errors';

dotenv.config();

const { MONGODB_URI } = process.env;

/**
 * Función para realizar la conexión a la base de datos
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    throw new ConnectionError('Error connecting to Database');
  }
};

export default connectDB;
