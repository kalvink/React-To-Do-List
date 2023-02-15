import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, index, removeTodo, toggleTodo, editTodo, pinTodo }) {
  const completedStyle = {
    textDecoration: 'line-through'
  };

  return (
    <li className={todo.pinned ? 'pinned' : null}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(index)}
      />
      <span style={todo.completed ? completedStyle : null}>
        {todo.text}
      </span>
      <button onClick={() => removeTodo(index)}>Remove</button>
      <button onClick={() => editTodo(index, prompt('Enter new text:'))}>Edit</button>
      <button onClick={() => pinTodo(index)}>Pin</button>
    </li>
  );
}

export default TodoItem;