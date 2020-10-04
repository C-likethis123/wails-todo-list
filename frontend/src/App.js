import React, { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";
import "./assets/app.css";
import "./assets/base.css";
import classnames from "classnames";
import Wails from "@wailsapp/runtime"

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
      const updatedToDo = { ...todo }
      updatedToDo.title = trimmedTitle
      updatedToDo.completed = completed
      editToDo(updatedToDo)
    }
  }

  const toggleCompleted = () => {
    const completionStatus = !completed
    setCompleted(completionStatus)
    const updatedToDo = { ...todo, completed: completionStatus }
    editToDo(updatedToDo)
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
          onChange={toggleCompleted}
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
  const [todos, setTodos] = useState([]);
  const [newToDo, setNewToDo] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(true)

  const setError = (errorMessage) => {
    setErrorMessage(errorMessage)
    setTimeout(() => {
      setErrorMessage("")
    }, 3000);
  }

  const loadList = useCallback(() => {
    window.backend.Todos
      .LoadList()
      .then((list) => {
        try {
          Wails.Log.Info("I got this list: " + list)
          setTodos(JSON.parse(list))
          setLoading(false)
        } catch (e) {
          Wails.Log.Info("An error was thrown: " + e.message);
          setError("Unable to load todo list")
        }
      })
      .catch(error => setError(error))
  }, [loading])

//TODO: Debug why there's infinite renders
  useEffect(() => {
    Wails.Events.On("filemodified", loadList)

    Wails.Events.On("error", (message, number) => {
      let result = number * 2;
      setError(`${message}: ${result}`)
    })

    loadList()
  }, [loadList])

  const detectEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      // Add a ToDo to the todos list
      const trimmedValue = newToDo.trim();
      if (trimmedValue) {
        const itemId = todos.length === 0
          ? 0
          : (todos[todos.length - 1]).id + 1
        setTodos(
          todos.concat({
            id: itemId,
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

  const editToDo = (updatedToDo) => {
    const editedTodos = todos.map(todo => {
      // if this task has the same ID as the edited task
      if (updatedToDo.id === todo.id) {
        //
        return updatedToDo
      }
      return todo;
    });
    setTodos(editedTodos);
  }

  useEffect(() => {
    if (loading) {
      setLoading(false)
      return
    }
    window.backend.Todos.SaveList(JSON.stringify(todos, null, 2));
  }, [todos, loading])

  return (
    <div>
      {errorMessage ? <h2>{errorMessage}</h2> : null}
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
