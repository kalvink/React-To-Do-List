import React, { useState, useRef, useEffect } from 'react';
import './TodoItem.css';

function TodoItem({ todo, index, removeTodo, toggleTodo, editTodo, pinTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const [dueDate, setDueDate] = useState(todo.dueDate);
  const [isChecked, setIsChecked] = useState(todo.completed);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      editTodo(index, text, dueDate);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    editTodo(index, text, dueDate);
    setIsEditing(false);
  };

  return (
    <li className={isChecked ? 'completed' : ''}>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          className="edit-input"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      ) : (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={isChecked}
            onChange={() => {
              setIsChecked(!isChecked);
              toggleTodo(index);
            }}
          />
          <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
          <span className="due-date">{todo.dueDate}</span>
          <button className="pin" onClick={() => pinTodo(index)}>
            {todo.pinned ? 'Unpin' : 'Pin'}
          </button>

          <button className="remove-button" onClick={() => removeTodo(index)}>
            Remove
          </button>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
