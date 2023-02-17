import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import './App.css';

function TodoList() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [searchTerm, setSearchTerm] = useState('');

  const addTodo = (text, dueDate) => {
    let newTodos = [...todos, { text, completed: false, dueDate, pinned: false }];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const removeTodo = index => {
    let newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const toggleTodo = index => {
    let newTodos = [...todos];
    const todo = newTodos[index];
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };
    newTodos[index] = updatedTodo;
    if (todo.pinned && updatedTodo.completed) {
      // Move the completed pinned item to the bottom of the pinned list
      const pinnedTodos = newTodos.filter(t => t.pinned && !t.completed);
      const completedTodo = newTodos.filter(t => t.pinned && t.completed)[0];
      const newPinnedTodos = [...pinnedTodos];
      if (!pinnedTodos.includes(completedTodo)) {
        newPinnedTodos.push(completedTodo);
      }
      const newUnpinnedTodos = newTodos.filter(t => !t.pinned);
      newTodos = [...newPinnedTodos, ...newUnpinnedTodos];
    }
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };



  const editTodo = (index, text, dueDate) => {
    let newTodos = [...todos];
    newTodos[index].text = text;
    newTodos[index].dueDate = dueDate;
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const pinTodo = index => {
    const newTodos = [...todos];
    const todoToPin = newTodos[index];
    todoToPin.pinned = !todoToPin.pinned;

    if (todoToPin.pinned) {
      // Remove the item from the list and put it at the start
      newTodos.splice(index, 1);
      newTodos.unshift(todoToPin);
    } else {
      // Sort the list by date and priority
      newTodos.sort((a, b) => {
        if (a.pinned && !b.pinned) {
          return -1;
        }
        if (!a.pinned && b.pinned) {
          return 1;
        }
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        if (!dateA.getTime()) {
          return 1;
        }
        if (!dateB.getTime()) {
          return -1;
        }
        return dateA - dateB;
      });
    }

    if (!todoToPin.completed) {
      // Only set completed to false if the task is not already completed
      todoToPin.completed = false;
    }

    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };




  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const filteredTodos = todos
    .filter(todo => todo.text.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => getSortOrderForTask(a) - getSortOrderForTask(b));


  function getSortOrderForTask(task) {
    if (!task.dueDate) {
      return Infinity;
    }
    return new Date(task.dueDate).getTime();
  }

  useEffect(() => {
    const newTodos = [...todos];
    const undoneTodos = newTodos.filter(todo => !todo.completed);
    undoneTodos.sort((a, b) => getSortOrderForTask(a) - getSortOrderForTask(b));

    const pinnedTodos = undoneTodos.filter(todo => todo.pinned);
    const unpinnedTodos = undoneTodos.filter(todo => !todo.pinned);
    const sortedUndoneTodos = [...pinnedTodos, ...unpinnedTodos];

    setTodos([...sortedUndoneTodos, ...newTodos.filter(todo => todo.completed)]);
    localStorage.setItem('todos', JSON.stringify([...sortedUndoneTodos, ...newTodos.filter(todo => todo.completed)]));
  }, [todos, todos.map(todo => todo.completed).join(), todos.map(todo => todo.pinned).join()]);

  return (
    <div className="container">
      <h1><a>Todo List</a></h1>
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
            todo={todo}
            index={index}
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