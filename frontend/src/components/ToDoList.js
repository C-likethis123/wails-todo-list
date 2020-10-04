import React from 'react';
import classnames from "classnames";

function ToDoList({ todos }) {
  return (
    <ul className="todo-list">
      {todos.map(({ id, title, completed }) =>
        <li
          key={id}
          className={classnames({ todo: true, completed })}
        >
          <div className="view">
            <input
              type="checkbox"
              checked={completed}
              className="toggle"
            />
            <label>{title}</label>
          </div>
        </li>)
      }
    </ul>
  );
}

export default ToDoList;