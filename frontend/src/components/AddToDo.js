import React from 'react';

function AddToDo({ addToDo }) {
  return (
    <form>
      <input
        className="new-todo"
        type="input"
        placeholder="Add a ToDo"
      />
    </form>
  );
}

export default AddToDo;