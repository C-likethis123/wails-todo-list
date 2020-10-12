import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import './assets/app.css';
import './assets/base.css';

import AddToDo from './components/AddToDo'
import ToDoList from './components/ToDoList'

import useErrorState from './hooks/useErrorState'
import Wails from '@wailsapp/runtime';

function App() {
  const [todos, setTodos] = useState([]);
  const [error, displayError] = useErrorState()

  const loadList = () => {
    window.backend.Todos.LoadList()
      .then((list) => setTodos(JSON.parse(list)))
      .catch(err => displayError(err))
  }
  // load list
  useEffect(() => {
    Wails.Events.On("filemodified", () => {
      displayError("Files modified")
    })

    Wails.Events.On("error", (message, num) => {
      displayError(`${message}: ${num * 2}`)
    })
    loadList()
    // eslint-disable-next-line
  }, [])

  // watch list
  useEffect(() => {
    window.backend.Todos.SaveList(JSON.stringify(todos))
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
    <>
      { error !== '' && <h2>{error}</h2>}
      <section className="todoapp">
        <h1>To Do List</h1>
        <AddToDo addToDo={addToDo} />
        <ToDoList todos={todos} deleteToDo={deleteToDo} editToDo={editToDo} />
      </section>
    </>

  );
}

export default App;
