import React from "react";
import NavLinks from "../components/navLinks/NavLinks";
import TaskItem from "../components/tasks/TaskItem";
import TaskInput from "../components/tasks/TaskInput";
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import useTasks from "../hooks/useTasks";

function Home({ user }) {
  const { tasks, newTask, setNewTask, editingTask, setEditingTask, error, addTask, deleteTask, editTask, saveTask } = useTasks(user.id);

  return (
    <div className="main-container">
      <NavLinks />

      <TaskInput newTask={newTask} setNewTask={setNewTask} addTask={addTask} />

      <ErrorMessage message={error} />

      <ol>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={editTask}
            onDelete={deleteTask}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            saveTask={saveTask}
          />
        ))}
      </ol>
    </div>
  );
}

export default Home;




