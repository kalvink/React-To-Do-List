import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, index, removeTodo, toggleTodo, editTodo, pinTodo }) {
  const completedStyle = {
    textDecoration: 'line-through'
  };

  const handleEdit = () => {
    const newTaskName = prompt('Enter new task name', todo.text);
    const newDueDate = new Date(prompt('Enter due date', todo.dueDate));
    if (newTaskName && newDueDate) {
      editTodo(index, newTaskName, newDueDate);
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
      <span className="due-date">{todo.dueDate ? todo.dueDate.toLocaleDateString() : ''}</span>

      <button className="pin-button" onClick={handlePin}>
        {todo.pinned ? 'Unpin' : 'Pin'}
      </button>
      <form className="edit-form" onSubmit={handleEdit}>
        <input
          type="text"
          className="edit-input"
          name="editInput"
          defaultValue={todo.text}
        />
        <button type="submit">Save</button>
      </form>
      <button className="remove-button" onClick={() => removeTodo(index)}>Remove</button>
    </li>
  );
}

export default TodoItem;
