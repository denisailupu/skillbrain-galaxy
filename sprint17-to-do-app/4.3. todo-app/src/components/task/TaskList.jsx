import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onUpdate, onDelete, listRef }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="list-container" ref={listRef}>
        <div className="task-item" style={{ justifyContent: "center", color: "#333" }}>
          Nu există taskuri. Adaugă primul task!
        </div>
      </div>
    );
  }

  return (
    <div className="list-container" ref={listRef}>
      {tasks.map((t, idx) => (
        <TaskItem key={idx} index={idx} text={t.text} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}