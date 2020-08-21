import React from 'react';
import './App.css';

function App() {
  return (
    <div>
      <section class="todoapp" v-cloak>
        <header class="header">
          <h1>todos</h1>
          <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" />
        </header>
        <section class="main">
          <ul class="todo-list">
            <li class="todo">
              <div class="view">
                <label>A todo item</label>
              </div>
            </li>
          </ul>
        </section>
      </section>
  </div>
  );
}

export default App;
