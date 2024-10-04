import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const TaskItem = ({ task, onEdit, onDelete, editingTask, setEditingTask, saveTask }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (editingTask.id === task.id && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTask, task.id]);

  return (
    <li>
      {editingTask.id === task.id ? (
        <input
          ref={inputRef}
          type="text"
          value={editingTask.text}
          onChange={(e) => setEditingTask({ ...editingTask, text: e.target.value })}
          onKeyDown={(e) => e.key === 'Enter' && saveTask()}
        />
      ) : (
        <span className="task-text">{task.text}</span>
      )}

      <button
        className={editingTask.id === task.id ? "save-button" : "edit-button"}
        onClick={editingTask.id === task.id ? saveTask : () => onEdit(task)}
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>

      <button className="delete-button" onClick={() => onDelete(task.id)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </li>
  );
};

export default TaskItem;


