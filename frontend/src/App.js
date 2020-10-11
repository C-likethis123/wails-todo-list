import React, { useCallback, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import './assets/app.css';
import './assets/base.css';
import useErrorState from './hooks/useErrorState'
import AddToDo from './components/AddToDo'
import ToDoList from './components/ToDoList'

import Wails from '@wailsapp/runtime';

function App() {
  const [todos, setTodos] = useState([]);
  const [error, displayError] = useErrorState()
  const [loading, setLoading] = useState(true)

  const loadList = useCallback(() => {
    window.backend.Todos
      .LoadList()
      .then(list => {
        setTodos(JSON.parse(list))
        setLoading(false)
      })
      .catch(err => displayError("Unable to load todo list"));
  }, [displayError])

  // load list
  useEffect(() => {
    Wails.Events.On("filemodified", loadList)

    Wails.Events.On("error", (message, number) => displayError(`${message}: ${number * 2}`))

    loadList()
  }, [loadList, displayError])

  // save changes to list
  useEffect(() => {
    if (loading) {
      setLoading(false)
      return
    }
    window.backend.Todos
      .SaveList(JSON.stringify(todos, null, 2))
  }, [todos, loading])

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
      {error ? <h2>{error}</h2> : null}
      <section className="todoapp">
        <h1>To Do List</h1>
        <AddToDo addToDo={addToDo} />
        <ToDoList todos={todos} deleteToDo={deleteToDo} editToDo={editToDo} />
      </section>
    </>

  );
}

export default App;
