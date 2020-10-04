import React, { useState } from "react";
import "./App.css";
import './assets/app.css';
import './assets/base.css';
import classnames from "classnames";

function App() {
  const [todos, setTodos] = useState([]);
  return (
    <div className="todoapp">
      <h1>To Do List</h1>
    </div>
  );
}

export default App;
