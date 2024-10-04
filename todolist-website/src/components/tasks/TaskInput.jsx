import React from "react";

const TaskInput = ({ newTask, setNewTask, addTask }) => {
  const handleInputChange = (e) => setNewTask(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Enter a task..."
        value={newTask}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className="add-button" onClick={addTask}>Add</button>
    </div>
  );
};

export default TaskInput;
