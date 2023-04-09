import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './components/model';
import TodoList from './components/TodoList';
import axios from 'axios';
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo) return;
    try {
      const newTodo = {
        id: Date.now(),
        todo: todo,
        isDone: false,
      };
      // send post request to database create a new todo 
      const response = await axios.post('http://localhost:5000', newTodo);
      console.log(response.data);
      console.log(newTodo);
      // Update the local todos state
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      // Clear the input field
      setTodo('');
    }
  };
  return (
    <div className="App">
      <span className="heading"> To Do List</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
