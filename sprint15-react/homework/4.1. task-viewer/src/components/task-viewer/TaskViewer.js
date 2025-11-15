import "./TaskViewer.css";
import TaskCard from "../task-card/TaskCard";

function TaskViewer({ tasks }) {
  return (
    <section className="task-viewer">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          status={task.status}
          name={task.name}
          dueDate={task.dueDate}
        />
      ))}
    </section>
  );
}

export default TaskViewer;