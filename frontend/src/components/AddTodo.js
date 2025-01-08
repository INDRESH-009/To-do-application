import React, { useState } from "react";
import axios from "axios";

const AddTodo = ({ fetchTodos }) => {
  const [title, setTitle] = useState("");

  const handleAdd = async () => {
    if (title.trim() === "") return alert("Please enter a title.");
    await axios.post("http://localhost:5001/tasks", { title });
    setTitle(""); // Clear input field
    fetchTodos(); // Refresh the list
  };

  return (
    <div className="add-todo">
      <input
        type="text"
        value={title}
        placeholder="Add a new task"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddTodo;
