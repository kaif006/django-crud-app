import React, { useEffect, useState } from "react";
import api from "../api";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

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

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditValue(task.title);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditSave = async (id) => {
    if (!editValue.trim()) return;
    try {
      await api.patch(`tasks/${id}/`, { title: editValue });
      setEditingId(null);
      setEditValue("");
      fetchTasks();
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditValue("");
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
            {editingId === task.id ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={handleEditChange}
                  className="form-control me-2"
                  style={{ maxWidth: 200, display: 'inline-block' }}
                />
                <button className="btn btn-sm btn-success me-2" onClick={() => handleEditSave(task.id)}>
                  Save
                </button>
                <button className="btn btn-sm btn-secondary" onClick={handleEditCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                {task.title}
                <span>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(task)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task.id)}>
                    Delete
                  </button>
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
