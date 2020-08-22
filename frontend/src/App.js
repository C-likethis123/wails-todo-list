import React from "react";
import "./App.css";
import "./assets/app.css";
import "./assets/base.css";

import classnames from "classnames";
function App() {
  const todos = [{ id: 0, title: "My test to do item", completed: true }];
  return (
    <div>
      <section class="todoapp" v-cloak>
        <header class="header">
          <h1>todos</h1>
          <input
            class="new-todo"
            autofocus
            autocomplete="off"
            placeholder="What needs to be done?"
          />
        </header>
        {todos.length > 0 ? (
          <section class="main">
            <ul class="todo-list">
              {todos.map((todo) => (
                <li
                  className={classnames({
                    todo,
                    completed: todo.completed,
                  })}
                >
                  <div className="view">
                    <label>{todo.title}</label>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </section>
    </div>
  );
}

export default App;
