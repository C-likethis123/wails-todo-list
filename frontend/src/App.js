import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import './assets/app.css';
import './assets/base.css';
import AddToDo from './components/AddToDo'
import ToDoList from './components/ToDoList'

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    window.backend.saveList(JSON.stringify(todos))
  }, [todos])

  const addToDo = (todoTitle) => {
    const title = todoTitle.trim()
    if (title) {
      setTodos([...todos,
      {
        id: nanoid(),
        title,
        completed: false,
      }])
    }
  }

  const deleteToDo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId))
  }

  const editToDo = (editedToDo) => {
    setTodos(todos.map(todo => todo.id === editedToDo.id ? editedToDo : todo))
  }

  return (
    <section className="todoapp">
      <h1>To Do List</h1>
      <AddToDo addToDo={addToDo} />
      <ToDoList todos={todos} deleteToDo={deleteToDo} editToDo={editToDo} />
    </section>
  );
}

export default App;
