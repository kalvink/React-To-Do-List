import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import './App.css';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = text => {
    const newTodos = [...todos, { text, completed: false }];
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const toggleTodo = index => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
    <div>
      <TodoForm addTodo={addTodo} />
      <ul>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            index={index}
            todo={todo}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
