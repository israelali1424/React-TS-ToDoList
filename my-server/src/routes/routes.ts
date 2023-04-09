import express from 'express';
import SingleTodo from '../models/SingeTodo';
const router = express.Router();
router.use(express.json());
router.get('/', function (req, res) {
  res.send('<h1>Israel is the best</h1>');
});

router.get('/h', function (req, res) {
  res.send('<h1>You are fake</h1>');
});
// add a new todo to the database 
router.route('/').post(async (req, res) => {
  try {
    const { todo, id, isDone } = req.body;
    const newSingleToDo = new SingleTodo({ todo, id, isDone });
    await newSingleToDo.save();
    res.json('new Single To Do added!');
  } catch (error) {
    console.log('There is an error');
    console.error(error);
    res.status(500).send();
  }
});

export default router;
