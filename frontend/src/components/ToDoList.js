import React, { useState } from 'react';
import classnames from "classnames";

function ToDo({ id, title, completed, deleteToDo }) {
  const [editedTitle, setEditedTitle] = useState(title)
  const updateEditedTitle = (event) => setEditedTitle(event.target.value)
  const [isEditing, setIsEditing] = useState(false)
  const allowEdits = () => setIsEditing(true)

  return <li
    key={id}
    className={classnames({ todo: true, completed, editing: isEditing })}
  >
    <div className="view">
      <input
        type="checkbox"
        checked={completed}
        className="toggle"
      />
      <label onDoubleClick={allowEdits}>{title}</label>
      <button
        className="destroy"
        onClick={() => deleteToDo(id)}
      />
    </div>
    <input
      className={classnames({ editing: !isEditing, edit: true })}
      type="text"
      value={editedTitle}
      onChange={updateEditedTitle}
    />
  </li>
}

function ToDoList({ todos, deleteToDo }) {
  return (
    <ul className="todo-list">
      {todos.map(({ id, title, completed }) =>
        <ToDo
          title={title}
          completed={completed}
          id={id}
          key={id}
          deleteToDo={deleteToDo}
        />)
      }
    </ul>
  );
}

export default ToDoList;