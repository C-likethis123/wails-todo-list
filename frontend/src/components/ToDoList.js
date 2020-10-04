import React from 'react';

function ToDoList({ todos }) {
  return (
      <ul className="todo-list">
        {todos.map(todo =>
          <li className="todo">
            <div className="view">
              <label>{todo}</label>
            </div>
          </li>)
        }
      </ul>
  );
}

export default ToDoList;