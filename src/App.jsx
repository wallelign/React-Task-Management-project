import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import ToDoInput from "./components/ToDOInput";
import ToDoList from "./components/ToDoList";
import Filters from "./components/Filters";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (name, description, priority, dueDate) => {
    const newTask = {
      id: Date.now(),
      name,
      description,
      priority,
      completed: new Date(dueDate) < new Date(),
      dueDate,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container mx-auto p-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">To-Do List</h1>
                <AddTaskButton />
              </div>
              <Filters filter={filter} setFilter={setFilter} />
              <ToDoList
                tasks={filteredTasks}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
              />
            </div>
          }
        />
        <Route path="/add-task" element={<ToDoInput onAddTask={addTask} />} />
      </Routes>
    </Router>
  );
}

function AddTaskButton() {
  const navigate = useNavigate();

  return (
    <button
      className="bg-green-500 text-white px-4  mt-8 py-2 rounded"
      onClick={() => navigate("/add-task")}
    >
      Add Task
    </button>
  );
}

export default App;
