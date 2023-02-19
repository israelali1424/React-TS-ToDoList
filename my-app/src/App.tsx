import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './components/model';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      // ...allTodoso : is what is already  in the todo allTodoso list,
      // part after comma add a new todo to the list
      setAllTodos([...allTodos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo('');
    }
    console.log(allTodos);
  };
  return (
    <div className="App">
      <span className="heading"> To Do List</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
    </div>
  );
};

export default App;
