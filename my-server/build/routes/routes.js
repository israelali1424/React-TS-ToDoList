"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.use(express_1.default.json());
router.get('/', function (req, res) {
    res.send('<h1>Israel is the Great</h1>');
});
router.get('/h', function (req, res) {
    res.send('<h1>You are fake</h1>');
});
/*
router.route('/').post(async (req, res) => {
  try {
    const todo = req.body.todo;
    const id = req.body.id;
    const isDone = req.body.isDone;
    const newSingleToDo = new SingleTodo({ todo, id, isDone });
    await newSingleToDo.save();
    res.json('new Single To Do added!');
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});
*/
exports.default = router;
