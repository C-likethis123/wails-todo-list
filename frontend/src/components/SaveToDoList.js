import React from 'react';

function SaveToDoList({ saveAs }) {
  return (
    <div className="buttons">
      <ul className="filters">
        <li>
          <a onClick={saveAs}>
            Save List
        </a>
        </li>
      </ul>
    </div>
  );
}

export default SaveToDoList;