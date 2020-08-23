import React, { useState, useRef } from "react";
import "./App.css";
import "./assets/app.css";
import "./assets/base.css";

import classnames from "classnames";

const ToDo = ({ todo, removeToDo, editToDo }) => {
  const [completed, setCompleted] = useState(todo.completed)
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(todo.title)
  const editInputRef = useRef(null)
  const allowEdits = () => {
    setIsEditing(true)
    setTimeout(() => editInputRef.current.focus(), 100)
  };

  const completeEdit = (event) => {
    if (event.key === 'Enter') {
      setIsEditing(false)
      const trimmedTitle = editedTitle.trim()
      editToDo(todo, trimmedTitle)
    }
  }

  const cancelEdit = () => {
    setEditedTitle(todo.title)
    setIsEditing(false)
  }

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
        <label onDoubleClick={allowEdits}>
          {todo.title}
        </label>
        <button className="destroy" onClick={() => removeToDo(todo.id)} />
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
        onKeyUp={completeEdit}
        onBlur={cancelEdit}
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

  const editToDo = (todo, editedTitle) => {
    todo.title = editedTitle;
    setTodos(todos)
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
                <ToDo key={todo.id} todo={todo} removeToDo={removeToDo} editToDo={editToDo} />
              ))}
            </ul>
          </section>
        ) : null}
      </section>
    </div>
  );
}

export default App;
