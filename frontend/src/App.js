import React, { useState } from "react";
import "./App.css";
import './assets/app.css';
import './assets/base.css';
import AddToDo from './components/AddToDo'
import ToDoList from './components/ToDoList'
import classnames from "classnames";

function App() {
  const [todos, setTodos] = useState([{ id: 0, title: "My test to do item!" }]);
  return (
    <section className="todoapp">
      <h1>To Do List</h1>
      <AddToDo />
      <ToDoList todos={todos} />
    </section>
  );
}

export default App;
