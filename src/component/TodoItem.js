import React from 'react';

function TodoItem({ todo, index, removeTodo }) {
  return (
    <li>
      {todo.text}
      <button onClick={() => removeTodo(index)}>Remove</button>
    </li>
  );
}

export default TodoItem;
