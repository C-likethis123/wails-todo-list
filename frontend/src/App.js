import React, { useState, useRef } from "react";
import "./App.css";
import "./assets/app.css";
import "./assets/base.css";

import classnames from "classnames";

const ToDo = ({ todo, removeToDo }) => {
  const [completed, setCompleted] = useState(todo.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const editInputRef = useRef(null);
  const editToDo = () => {
    setIsEditing(true)
    setTimeout(() => editInputRef.current.focus(), 100)
  };


  return (
    <li
      className={classnames({
        todo: true,
        completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => setCompleted(!completed)}
          className="toggle"
        />
        <label
          onDoubleClick={() => editToDo()}
        >
          {todo.title}
        </label>
        <button className="destroy" onClick={() => removeToDo(todo.id)}></button>
      </div>
      <input
        className={classnames({
          editing: isEditing,
          edit: true,
        })}
        ref={editInputRef}
        type="text"
        value={editedTitle}
        onChange={(event) => setEditedTitle(event.target.value)}
      />
    </li>
  );
};

function App() {
  const [todos, setTodos] = useState([
    { id: 0, title: "My test to do item", completed: false },
  ]);
  const [newToDo, setNewToDo] = useState("");

  const detectEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      // Add a ToDo to the todos list
      const trimmedValue = newToDo.trim();
      if (trimmedValue) {
        const lastToDo = todos[todos.length - 1]
        const lastId = lastToDo.id + 1
        setTodos(
          todos.concat({
            id: lastId,
            title: trimmedValue,
            completed: false,
          })
        );
      }
      // Reset input
      setNewToDo("");
    }
  };

  const removeToDo = (todoId) => {
    setTodos(todos.filter(item => item.id !== todoId))
  }

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            autoFocus
            autoComplete="off"
            placeholder="What needs to be done?"
            value={newToDo}
            onChange={(event) => setNewToDo(event.target.value)}
            onKeyUp={detectEnterKeyPress}
          />
        </header>
        {todos.length > 0 ? (
          <section className="main">
            <ul className="todo-list">
              {todos.map((todo) => (
                <ToDo todo={todo} removeToDo={removeToDo} />
              ))}
            </ul>
          </section>
        ) : null}
      </section>
    </div>
  );
}

export default App;
