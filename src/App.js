import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [archivedTodos, setArchivedTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const storedArchivedTodos = JSON.parse(localStorage.getItem('archivedTodos')) || [];
    setTodos(storedTodos);
    setArchivedTodos(storedArchivedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('archivedTodos', JSON.stringify(archivedTodos));
  }, [archivedTodos]);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, newTodo]);
    setNewTodo('');
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    const deletedTodo = todos[index];
    setTodos(newTodos);
    setArchivedTodos([...archivedTodos, deletedTodo]);
  };

  const restoreTodo = (index) => {
    const restoredTodo = archivedTodos[index];
    const newArchivedTodos = archivedTodos.filter((_, i) => i !== index);
    setArchivedTodos(newArchivedTodos);
    setTodos([...todos, restoredTodo]);
  };

  const permanentlyDeleteTodo = (index) => {
    const confirmation = window.confirm("Are you sure you want to permanently delete this task?");
    if (confirmation) {
      const newArchivedTodos = archivedTodos.filter((_, i) => i !== index);
      setArchivedTodos(newArchivedTodos);
    }
  };

  const toggleArchived = () => {
    setShowArchived(!showArchived);
  };

  return (
    <div className="container">
      <button className="btn btn-outline-secondary mb-3 float-right trash-icon" onClick={toggleArchived}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
      <h1 className="my-4">Todo List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newTodo}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo"
        />
        <button className="btn btn-primary" onClick={addTodo}>Add</button>
      </div>
      <ul className="list-group mb-3">
        {todos.map((todo, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {todo}
            <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
      {showArchived && (
        <div className="archived">
          <h2>Archived Tasks</h2>
          <ul className="list-group">
            {archivedTodos.map((todo, index) => (
              <li key={index} className="list-group-item">
                {todo}
                <div>
                  <button className="btn btn-success btn-sm restore-btn" onClick={() => restoreTodo(index)}>Restore</button>
                  <button className="btn btn-danger btn-sm" onClick={() => permanentlyDeleteTodo(index)}>Permanently Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
