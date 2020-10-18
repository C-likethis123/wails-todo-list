import React from 'react';

function Options({ saveAs, loadNewList }) {
  return (
    <div className="buttons">
      <ul className="filters">
        <li>
          <a onClick={saveAs}>
            Save List
        </a>
        </li>
        <li>
          <a onClick={loadNewList}>
            Load List
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Options;