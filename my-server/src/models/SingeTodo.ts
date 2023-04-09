import mongoose from 'mongoose';
const { Schema, model } = mongoose;

//todo schema
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
// todos is the name of the collection for the schemas
const SingleTodo = model('Todos', singleTodoSchema);

export default SingleTodo;
