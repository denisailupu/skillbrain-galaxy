import React, { useRef, useState } from "react";
import "./App.css";

import AddTask from "./components/task/AddTask";
import TaskList from "./components/task/TaskList";

const MAX_TASKS = 10;

export default function App() {
  const [tasks, setTasks] = useState([]);
  const listRef = useRef(null);

  const addTask = (text) => {
    if (tasks.length >= MAX_TASKS) return false;
    setTasks((prev) => [...prev, { text }]);
    setTimeout(() => {
      if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
    }, 50);
    return true;
  };

  const updateTask = (index, newText) => {
    setTasks((prev) => prev.map((t, i) => (i === index ? { ...t, text: newText } : t)));
  };

  const deleteTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      <h1>To Do App</h1>

      <AddTask onAdd={addTask} disabled={tasks.length >= MAX_TASKS} />

      {tasks.length >= MAX_TASKS && (
        <div className="limit-message">
          Ai atins 10 taskuri. Completează sau elimină taskuri pentru a adăuga altele noi.
        </div>
      )}

      <div className="separator" />

      <div className="list-wrapper">
        <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} listRef={listRef} />
      </div>
    </div>
  );
}