import React, { useEffect, useState } from "react";
import axios from "axios";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:5001/tasks");
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app">
      <h1>To-Do App</h1>
      <AddTodo fetchTodos={fetchTodos} />
      <TodoList todos={todos} fetchTodos={fetchTodos} />
    </div>
  );
};

export default App;