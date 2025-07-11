import React, { useEffect, useState } from "react";
import api from "../api";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await api.get("tasks/");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  const handleAdd = async () => {
    if (!newTask.trim()) return;
    try {
      await api.post("tasks/", { title: newTask });
      setNewTask("");
      fetchTasks();
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`tasks/${id}/`);
      fetchTasks();
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Your Tasks</h2>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-outline-primary" onClick={handleAdd}>Add</button>
      </div>

      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            {task.title}
            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
