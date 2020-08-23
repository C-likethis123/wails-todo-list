import React from "react";
import "./App.css";
import "./assets/app.css";
import "./assets/base.css";

import classnames from "classnames";

const ToDo = ({ todo, removeToDo }) => {
  const [completed, setCompleted] = useState(todo.completed);
  return (
    <li
      className={classnames({
        todo: true,
        completed,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          checked={completed}
          onClick={() => setCompleted(!completed)}
          className="toggle"
        />
        <label>{todo.title}</label>
        <button className="destroy" onClick={() => removeToDo(todo.id)}></button>
      </div>
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
      <section class="todoapp" v-cloak>
        <header class="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            autofocus
            autocomplete="off"
            placeholder="What needs to be done?"
            value={newToDo}
            onChange={(event) => setNewToDo(event.target.value)}
            onKeyUp={detectEnterKeyPress}
          />
        </header>
        {todos.length > 0 ? (
          <section class="main">
            <ul class="todo-list">
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
