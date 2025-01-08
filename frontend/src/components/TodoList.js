import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, fetchTodos }) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} fetchTodos={fetchTodos} />
      ))}
    </div>
  );
};

export default TodoList;
