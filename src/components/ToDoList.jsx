import React from "react";

function ToDoList({ tasks, onToggleTask, onDeleteTask }) {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Priority</th>
            <th className="border border-gray-300 px-4 py-2">Due Date</th>
            <th className="border border-gray-300 px-4 py-2">Completed</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{task.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {task.description}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {task.priority}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {task.dueDate}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleTask(task.id)}
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ToDoList;
