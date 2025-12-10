import React, { useState } from "react";

export default function AddTask({ onAdd, disabled }) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    const v = value.trim();
    if (!v) return;
    const ok = onAdd(v);
    if (ok) setValue("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="add-task-container" role="region" aria-label="add-task">
      <input
        className="add-task-input"
        type="text"
        placeholder="Scrie un task..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKey}
        aria-label="task-input"
        disabled={disabled}
      />
      <button className="add-task-button" onClick={handleAdd} disabled={disabled}>
        Adaugă
      </button>
    </div>
  );
}