import React, { useState, useEffect } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './components/model';
import TodoList from './components/TodoList';
import axios from 'axios';
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  // refresh is  being to trigger a re-render of the TodoList component when changes are made to the todos list.
  const [refresh, setRefresh] = useState<boolean>(false);

  // fetch all todo items and store them in the setTodos for the state of the react app
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/allTodos');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    /*The useEffect hook is used to call fetchTodos() 
    whenever the refresh state variable changes. 
    This is achieved by passing refresh as a dependency to the useEffect hook, 
    which means that whenever refresh changes, 
    the effect will be triggered and fetchTodos() will be called.
    */
    fetchTodos();
  }, [refresh]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo) return;
    try {
      // newTodo item to be added to database
      const newTodo = {
        id: Date.now(),
        todo: todo,
        isDone: false,
      };
      const response = await axios.post('http://localhost:5000', newTodo);
      console.log(response.data);
      setRefresh(!refresh); // trigger refesh/update from data base to display changes
    } catch (error) {
      console.error('Error adding todo:', error);
      
      //ensures that the input field is cleared after the user submits a new todo item.
    } finally {
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
