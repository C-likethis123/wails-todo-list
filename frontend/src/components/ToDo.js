import React, { useState, useRef } from 'react';
import classnames from "classnames";

function ToDo({ id, title, completed, deleteToDo, editToDo }) {
  const [editedTitle, setEditedTitle] = useState(title)
  const updateEditedTitle = (event) => setEditedTitle(event.target.value)
  const [isEditing, setIsEditing] = useState(false)
  const editInputRef = useRef(null)
  const allowEdits = () => {
    setIsEditing(true)
    setTimeout(() => editInputRef.current.focus(), 100)
  }

  const completeEdit = (event) => {
    event.preventDefault()
    editToDo({ id, title: editedTitle, completed })
    setIsEditing(false)
  }

  const toggleCompleted = () => {
    editToDo({id, title, completed: !completed})
  }

  return <li
    key={id}
    className={classnames({ todo: true, completed, editing: isEditing })}
  >
    <div className="view">
      <input
        type="checkbox"
        checked={completed}
        onChange={toggleCompleted}
        className="toggle"
      />
      <label onDoubleClick={allowEdits}>{title}</label>
      <button
        className="destroy"
        onClick={() => deleteToDo(id)}
      />
    </div>
    <form onSubmit={completeEdit}>
      <input
        className={classnames({ editing: !isEditing, edit: true })}
        type="text"
        value={editedTitle}
        ref={editInputRef}
        onChange={updateEditedTitle}
      />
    </form>
  </li>
}

export default ToDo