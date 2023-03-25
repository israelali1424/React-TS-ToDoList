import express from 'express';
import SingleTodo from '../models/SingeTdo';
const router = express.Router();
router.use(express.json());
router.get('/', function (req, res) {
  res.send('<h1>Israel is the Great</h1>');
});

router.get('/h', function (req, res) {
  res.send('<h1>You are fake</h1>');
});


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

export default router;