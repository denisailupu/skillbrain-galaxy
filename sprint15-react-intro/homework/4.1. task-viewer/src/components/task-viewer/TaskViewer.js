import React from 'react';
import TaskCard from '../task-card/TaskCard';
import './TaskViewer.css';

const TaskViewer = ({ data }) => {
  const taskCards = [];

  data.forEach((task) => {
    taskCards.push(<TaskCard key={task.id} id={task.id} name={task.name} status={task.status} dueDate={task.dueDate} />);
  });

  return <div className="task-viewer">{taskCards}</div>;
};

export default TaskViewer;