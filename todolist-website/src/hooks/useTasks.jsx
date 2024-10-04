import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/ApiUrl";

const useTasks = (userId) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState({ id: null, text: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/task/${userId}`);
        setTasks(response.data || []);
      } catch (error) {
        setError("Failed to fetch tasks.");
      }
    };
  
    getTasks();
  }, [userId]);  

  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const response = await axios.post(`${API_BASE_URL}/task`, { text: newTask, userId });
        setTasks([...tasks, response.data]);
        setNewTask("");
      } catch (error) {
        setError("Failed to add task.");
      }
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/task/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      setError("Failed to delete task.");
    }
  };

  const editTask = (task) => {
    setEditingTask({ id: task.id, text: task.text });
  };

  const saveTask = async () => {
    const originalTask = tasks.find((task) => task.id === editingTask.id);
    if (originalTask.text === editingTask.text.trim()) {
      setEditingTask({ id: null, text: "" });
      return;
    }

    if (editingTask.text.trim()) {
      try {
        await axios.put(`${API_BASE_URL}/task/${editingTask.id}`, { text: editingTask.text });
        setTasks(tasks.map((task) => (task.id === editingTask.id ? { ...task, text: editingTask.text } : task)));
        setEditingTask({ id: null, text: "" });
      } catch (error) {
        setError("Failed to update task.");
      }
    } else {
      deleteTask(editingTask.id);
    }
  };

  return { tasks, newTask, setNewTask, editingTask, setEditingTask, error, addTask, deleteTask, editTask, saveTask };
};

export default useTasks;
