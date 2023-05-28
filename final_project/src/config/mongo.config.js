import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { DB_PASSWORD, DB_USERNAME, DB_NAME } = process.env;

const MONGO_URI = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@localhost:27017/${DB_NAME}?authSource=admin`;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
