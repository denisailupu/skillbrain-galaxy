import React, { useEffect, useState } from "react";

export default function TaskItem({ index, text, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(text);

  useEffect(() => {
    setEditValue(text);
  }, [text]);

  const startEdit = () => {
    setIsEditing(true);
    setEditValue(text);
  };

  const saveEdit = () => {
    const v = editValue.trim();
    if (!v) {
      alert("Titlul nu poate fi gol.");
      return;
    }
    onUpdate(index, v);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditValue(text);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEdit();
  };

  return (
    <div className="task-item" role="listitem" aria-label={`task-${index}`}>
      {isEditing ? (
        <>
          <input
            className="task-edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKey}
            autoFocus
            aria-label={`edit-input-${index}`}
          />
          <div className="task-buttons">
            <button className="task-btn save-btn" onClick={saveEdit}>Salvează</button>
            <button className="task-btn cancel-btn" onClick={cancelEdit}>Anulează</button>
          </div>
        </>
      ) : (
        <>
          <div className="task-text" onDoubleClick={startEdit} title="Dublu-click pentru editare">
            {text}
          </div>
          <div className="task-buttons">
            <button className="task-btn edit-btn" onClick={startEdit}>Editează</button>
            <button className="task-btn delete-btn" onClick={() => onDelete(index)}>Șterge</button>
          </div>
        </>
      )}
    </div>
  );
}