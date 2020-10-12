import { useState } from 'react';

export default () => {
  const [error, setError] = useState('')
  const displayError = (errorMessage) => {
    setError(errorMessage)
    setTimeout(() => setError(''), 3000)
  }
  return [error, displayError]
}
