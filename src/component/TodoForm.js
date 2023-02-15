import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value, dueDate);
    setValue('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Add to-do item"
      />
      <input
        type="date"
        className="input"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        placeholder="Due date"
      />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default TodoForm;
