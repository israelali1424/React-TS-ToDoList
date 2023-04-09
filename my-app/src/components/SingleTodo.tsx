import React, { useEffect, useRef, useState } from 'react';
import { Todo } from './model';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './styles.css';
import axios from 'axios';
export interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);
  // if the todo form the para matches the current todo set the done status
  // to the opposite of what was before else just return the todo
  const handleDone = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/update/isDone/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            isDone: !todos.find((todo) => todo.id === id)?.isDone,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update todo item');
      }

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    console.log(`http://localhost:5000/delete/${todo.id}`);
    const response = await axios.delete(
      `http://localhost:5000/delete/${todo.id}`
    );
    console.log(response.data);
  };

  const handleEdit = async (e: React.FormEvent, id: number) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/edit/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todo: editTodo,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update todo item');
      }

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, todo: editTodo } : todo
        )
      );
      setEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos__single--text"
        />
      ) : todo.isDone ? (
        // s is the strike tag
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}
      <div>
        <span
          className="icon"
          onClick={(e) => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            } else {
              handleEdit(e, todo.id);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;

/* Handle done as a regulat function 
  function handleDone(id: number): void {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  }
  */
