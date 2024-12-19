import React from "react";

function Filters({ filter, setFilter }) {
  return (
    <div className="flex space-x-2 mb-4">
      <button
        className={`px-4 py-2 rounded ${
          filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={`px-4 py-2 rounded ${
          filter === "active" ? "bg-green-600 text-white" : "bg-gray-200"
        }`}
        onClick={() => setFilter("active")}
      >
        Active
      </button>
      <button
        className={`px-4 py-2 rounded ${
          filter === "completed" ? "bg-red-600 text-white" : "bg-gray-200"
        }`}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
}

export default Filters;
