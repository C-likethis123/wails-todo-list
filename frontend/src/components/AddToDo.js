import React from 'react';
import useInputState from '../hooks/useInputState'

function AddToDo(props) {
  const [inputValue, updateInput, clearInput] = useInputState('')
  
  const addToDo = (event) => {
    event.preventDefault()
    props.addToDo(inputValue)
    clearInput('')
  }
  return (
    <form onSubmit={addToDo}>
      <input
        className="new-todo"
        type="input"
        placeholder="Add a ToDo"
        value={inputValue}
        onChange={updateInput}
      />
    </form>
  );
}

export default AddToDo;