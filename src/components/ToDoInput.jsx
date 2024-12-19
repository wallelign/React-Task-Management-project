import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ToDoInput({ onAddTask }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !dueDate) return;
    onAddTask(name, description, priority, dueDate);
    setName("");
    setDescription("");
    setPriority("low");
    setDueDate("");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Add Task</h2>
        <input
          type="text"
          className="border p-2 w-full mb-4"
          placeholder="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 w-full mb-4"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="border p-2 w-full mb-4"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          className="border p-2 w-full mb-4"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button
          type="submit"
          className="bg-yellow-600 text-white px-4 py-2 rounded w-full"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default ToDoInput;
