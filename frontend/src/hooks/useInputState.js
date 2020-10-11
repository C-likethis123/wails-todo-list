import { useState } from 'react';

export default (initialInput) => {
  const [inputValue, setInputValue] = useState(initialInput)
  const updateInput = (event) => setInputValue(event.target.value)
  const clearInput = () => setInputValue('')
  return [inputValue, updateInput, clearInput]
}