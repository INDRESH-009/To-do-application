import React from "react";
import axios from "axios";

const TodoItem = ({ todo, fetchTodos }) => {
  const handleDelete = async () => {
    await axios.delete(`http://localhost:5001/tasks/${todo._id}`);
    fetchTodos();
  };

  const handleToggle = async () => {
    await axios.put(`http://localhost:5001/tasks/${todo._id}`, {
      completed: !todo.completed,
    });
    fetchTodos();
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
      />
      <span>{todo.title}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;
