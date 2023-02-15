import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, index, removeTodo, toggleTodo }) {
  const completedStyle = {
    textDecoration: 'line-through'
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(index)}
      />
      <span style={todo.completed ? completedStyle : null}>
        {todo.text}
      </span>
      <button onClick={() => removeTodo(index)}>Remove</button>
    </li>
  );
}

export default TodoItem;
