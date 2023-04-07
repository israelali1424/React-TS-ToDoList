import mongoose from 'mongoose';
const { Schema, model } = mongoose;
//const Schema = mongoose.Schema;

const singleTodoSchema = new Schema(
  {
    todo: { type: String, required: true, trim: true },
    id: { type: Number, required: true, trim: true },
    isDone: { type: Boolean, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

//const SingleTodo = mongoose.model('User', singleTodoScheme);
const SingleTodo = model('Blog', singleTodoSchema);

export default SingleTodo;
