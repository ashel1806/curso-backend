import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

/* Definiendo el esquema */
const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Username is required'],
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Email is required'],
  },
  tasks: {
    type: [Schema.Types.ObjectId],
    ref: 'Task',
    default: [],
  }
});

/* Hasheando la contraseña antes de crear el usuario */
userSchema.pre('save', async function (next) {
  const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);

  next();
})

/* Eliminando el _id, __v y contraseña cuando se muestre el usuario */
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  }
})

/* Creando el modelo */
const User = model('User', userSchema);

export default User;
