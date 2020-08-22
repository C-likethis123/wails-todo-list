import React from "react";
import "./App.css";
import "./assets/app.css";
import "./assets/base.css";

function App() {
  const todos = [];
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
              <li class="todo">
                <div class="view">
                  <label>A todo item</label>
                </div>
              </li>
            </ul>
          </section>
        ) : null}
      </section>
    </div>
  );
}

export default App;
