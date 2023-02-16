import React, { useState, useEffect } from 'react';
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
    const todo = newTodos[index];
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };
    newTodos[index] = updatedTodo;
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    if (todo.completed && todo.pinned) {
      // The completed pinned item is being unpinned, so keep it marked as completed
      todo.completed = false;
      const newUnpinnedTodos = [...newTodos.filter(t => !t.pinned), todo];
      newUnpinnedTodos.sort((a, b) => getSortOrderForTask(a) - getSortOrderForTask(b));
      setTodos([...newTodos.filter(t => t.pinned), ...newUnpinnedTodos]);
      localStorage.setItem('todos', JSON.stringify([...newTodos.filter(t => t.pinned), ...newUnpinnedTodos]));
    }
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
    const todoToPin = newTodos[index];
    const firstTask = newTodos.find(task => task.pinned);

    todoToPin.pinned = !todoToPin.pinned;
    todoToPin.completed = firstTask ? firstTask.completed : false;

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
    // Update the display when a task is marked as done
    const newTodos = [...todos];
    const undoneTodos = newTodos.filter(todo => !todo.completed);
    undoneTodos.sort((a, b) => getSortOrderForTask(a) - getSortOrderForTask(b));

    // Move the pinned items to the top of the undone list
    const pinnedTodos = undoneTodos.filter(todo => todo.pinned);
    const unpinnedTodos = undoneTodos.filter(todo => !todo.pinned);
    const sortedUndoneTodos = [...pinnedTodos, ...unpinnedTodos];

    setTodos([...sortedUndoneTodos, ...newTodos.filter(todo => todo.completed)]);

    // Update local storage
    localStorage.setItem('todos', JSON.stringify([...sortedUndoneTodos, ...newTodos.filter(todo => todo.completed)]));
  }, [todos]);




  return (
    <div className="container">
      <h1>Todo List</h1>
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