import mongoose from 'mongoose';
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Description is required'],
  },
  done: { type: Boolean, default: false },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

/* Eliminando el _id y __v cuando se muestre el usuario */
taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

const Task = mongoose.model('Task', taskSchema);

export default Task;
