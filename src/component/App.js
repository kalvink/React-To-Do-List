import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import './App.css';

function TodoList() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [searchTerm, setSearchTerm] = useState('');

  const addTodo = (text, dueDate) => {
    const newTodos = [...todos, { text, completed: false, dueDate, pinned: false }];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const toggleTodo = index => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const editTodo = (index, text, dueDate) => {
    const newTodos = [...todos];
    newTodos[index].text = text;
    newTodos[index].dueDate = dueDate;
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const pinTodo = index => {
    const newTodos = [...todos];
    const todoToPin = newTodos.splice(index, 1);
    todoToPin[0].pinned = !todoToPin[0].pinned;
    newTodos.unshift(todoToPin[0]);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };
  
  const filteredTodos = todos
    .filter(todo => {
      return todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div>
      <TodoForm addTodo={addTodo} />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <ul>
        {filteredTodos.map((todo, index) => (
          <TodoItem
            key={index}
            index={index}
            todo={todo}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
            editTodo={editTodo}
            pinTodo={pinTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
