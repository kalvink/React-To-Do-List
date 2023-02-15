import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, index, removeTodo, toggleTodo, editTodo, pinTodo }) {
  const completedStyle = {
    textDecoration: 'line-through'
  };

  const handleEdit = (newTaskName, newDueDate) => {
    if (newTaskName && newDueDate) {
      editTodo(index, newTaskName, newDueDate.toISOString());
    }
  };

  const handlePin = () => {
    pinTodo(index);
  };

  return (
    <li className={todo.pinned ? 'pinned' : ''}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(index)}
      />
      <span style={todo.completed ? completedStyle : null}>
        {todo.text}
      </span>
      <span className="due-date">{todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : ''}</span>

      <button className="pin-button" onClick={handlePin}>
        {todo.pinned ? 'Unpin' : 'Pin'}
      </button>
      <form className="edit-form" onSubmit={e => {
        e.preventDefault();
        const newTaskName = e.target.editInput.value;
        const newDueDate = new Date(e.target.dueDateInput.value);
        handleEdit(newTaskName, newDueDate);
      }}>
        <input
          type="text"
          className="edit-input"
          name="editInput"
          defaultValue={todo.text}
        />
        <input
          type="date"
          className="edit-input"
          name="dueDateInput"
          defaultValue={todo.dueDate ? new Date(todo.dueDate).toISOString().slice(0, 10) : ''}
        />
        <button type="submit">Save</button>
      </form>
      <button className="remove-button" onClick={() => removeTodo(index)}>Remove</button>
    </li>
  );
}

export default TodoItem;
