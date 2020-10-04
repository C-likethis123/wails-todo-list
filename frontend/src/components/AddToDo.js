import React, { useState } from 'react';

function AddToDo(props) {
  const [value, setValue] = useState('')
  const updateValue = (event) => setValue(event.target.value)
  const addToDo = (event) => {
    event.preventDefault()
    props.addToDo(value)
    setValue('') // clear input
  }
  return (
    <form onSubmit={addToDo}>
      <input
        className="new-todo"
        type="input"
        placeholder="Add a ToDo"
        value={value}
        onChange={updateValue}
      />
    </form>
  );
}

export default AddToDo;