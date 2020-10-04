import React, { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import './assets/app.css';
import './assets/base.css';
import AddToDo from './components/AddToDo'
import ToDoList from './components/ToDoList'

function App() {
  const [todos, setTodos] = useState([{ id: 0, title: "My test to do item!", completed: false }]);
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

  return (
    <section className="todoapp">
      <h1>To Do List</h1>
      <AddToDo addToDo={addToDo} />
      <ToDoList todos={todos} />
    </section>
  );
}

export default App;
