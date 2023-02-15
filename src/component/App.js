import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div>
      <TodoForm addTodo={addTodo} />
      <ul>
        {todos.map((todo, index) => (
          <TodoItem key={index} index={index} todo={todo} removeTodo={removeTodo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
