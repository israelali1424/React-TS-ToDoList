import express from 'express';
import SingleTodo from '../models/SingeTodo';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();
router.use(express.json());

const mydb = process.env.DB as string;
const todo_collection = process.env.TODO_COLLECTION as string;

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

// Get all records from the database
router.get('/allTodos', async (req, res) => {
  const result = await getAllRecords(mydb, todo_collection);
  res.json(result);
});
// delete a todo Item
router.delete('/delete/:id', async (req, res) => {
  const id = Number(req.params.id);

  // Check if the input value for "id" is a valid number
  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid input for ID parameter' });
    return;
  }

  try {
    const result = await SingleTodo.deleteOne({ id: id });
    if (result.deletedCount === 1) {
      res
        .status(200)
        .json({ message: `Todo item with ID ${id} deleted successfully` });
    } else {
      res.status(404).json({ message: `Todo item with ID ${id} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// Define the getAllRecords function
export async function getAllRecords(
  databaseName: string,
  collectionName: string
) {
  console.log(
    `Getting all records from "${collectionName}" collection in "${databaseName}" database`
  );
  const db = mongoose.connection.db;
  if (!db) {
    console.log(
      'Database connection not ready yet. Waiting for "connected" event...'
    );
    await new Promise((resolve) =>
      mongoose.connection.once('connected', resolve)
    );
  }
  const result = await db
    .collection(collectionName)
    .find()
    .sort({ id: 1 })
    .toArray();

  console.log(`Got ${result.length} records`);
  return result;
}

// edit a todo item's todo field
router.put('/edit/todo/:id', async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;
  if (typeof todo === 'undefined') {
    return res.status(400).json({ error: 'todo req missing in request body' });
  }
  try {
    const result = await SingleTodo.findOneAndUpdate(
      { id: id },
      { $set: { todo: todo } },
      { new: true }
    );

    if (!result) {
      return res
        .status(404)
        .json({ message: `Todo item with ID ${id} not found` });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Update a todo item's isDone field
router.put('/update/isDone/:id', async (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body;

  if (typeof isDone === 'undefined') {
    return res
      .status(400)
      .json({ error: 'isDone req missing in request body' });
  }
  try {
    const result = await SingleTodo.findOneAndUpdate(
      { id: id },
      { $set: { isDone: isDone } },
      { new: true }
    );
    if (!result) {
      return res
        .status(404)
        .json({ message: `Todo item with ID ${id} not found` });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
