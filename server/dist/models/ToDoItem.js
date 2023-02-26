import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const toDoItem = new Schema({
    todo: { type: String, required: true, trim: true },
    id: { type: Number, required: true, trim: true },
    isDone: { type: Boolean, required: true, trim: true },
}, {
    timestamps: true,
});
//# sourceMappingURL=ToDoItem.js.map