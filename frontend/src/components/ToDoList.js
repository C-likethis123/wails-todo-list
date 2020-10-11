import React from 'react';
import ToDo from './ToDo';

function ToDoList({ todos, deleteToDo, editToDo }) {
  return (
    <ul className="todo-list">
      {todos.map(({ id, title, completed }) =>
        <ToDo
          title={title}
          completed={completed}
          id={id}
          key={id}
          deleteToDo={deleteToDo}
          editToDo={editToDo}
        />)
      }
    </ul>
  );
}

export default ToDoList;