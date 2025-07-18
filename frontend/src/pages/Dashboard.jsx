import { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    await API.post("/tasks", { title: newTask });
    setNewTask("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await API.put(`/tasks/${task._id}`, { completed: !task.completed });
    fetchTasks();
  };

  return (
    <div className="page-wrapper">
           {" "}
      <div className="dashboard-container">
                <h2>Todo Dashboard</h2>       {" "}
        <div className="task-input">
                   {" "}
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New task"
          />
                    <button onClick={addTask}>Add</button>       {" "}
        </div>
               {" "}
        <ul className="task-list">
                   {" "}
          {tasks.map((task) => (
            <li key={task._id}>
                           {" "}
              <span
                onClick={() => toggleTask(task)}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                                {task.title}             {" "}
              </span>
                           {" "}
              <button onClick={() => deleteTask(task._id)}>❌</button>         
               {" "}
            </li>
          ))}
                 {" "}
        </ul>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default Dashboard;
