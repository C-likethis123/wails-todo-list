import React from "react";
import "./App.css";
import "./assets/app.css";
import "./assets/base.css";

import classnames from "classnames";

const ToDo = ({ todo }) => {
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
          className={classnames({
            toggle: true,
          })}
        />
        <label>{todo.title}</label>
      </div>
    </li>
  );
};

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
                <ToDo todo={todo} />
              ))}
            </ul>
          </section>
        ) : null}
      </section>
    </div>
  );
}

export default App;
