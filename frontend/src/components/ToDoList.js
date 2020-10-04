import React from 'react';

function ToDoList({ todos }) {
  return (
    <ul className="todo-list">
      {todos.map(({ id, title }) =>
        <li key={id} className="todo">
          <div className="view">
            <label>{title}</label>
          </div>
        </li>)
      }
    </ul>
  );
}

export default ToDoList;