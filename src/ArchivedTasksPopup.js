// ArchivedTasksPopup.js

import React from 'react';
import './App.css';

function ArchivedTasksPopup({ archivedTodos, restoreTodo, permanentlyDeleteTodo, onClose }) {
  return (
    <div className="archived-tasks-popup">
      <h2>Archived Tasks</h2>
      <ul>
        {archivedTodos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => restoreTodo(index)}>Restore</button>
            <button onClick={() => permanentlyDeleteTodo(index)}>Permanently Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ArchivedTasksPopup;
