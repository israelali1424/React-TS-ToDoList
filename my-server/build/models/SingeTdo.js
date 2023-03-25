"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var singleTodoScheme = new Schema({
    todo: { type: String, required: true, trim: true },
    id: { type: Number, required: true, trim: true },
    isDone: { type: Boolean, required: true, trim: true },
}, {
    timestamps: true,
});
var SingleTodo = mongoose_1.default.model('User', singleTodoScheme);
exports.default = SingleTodo;
