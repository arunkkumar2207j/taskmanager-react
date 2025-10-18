import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import TaskCard from "../components/TaskCard";
import { Link } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    const res = await axiosInstance.get(`tasks/?page=${page}`);
    setTasks(res.data.results);
    setPage(res.data.count);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [page]);

  useEffect(() => {
    axiosInstance
      .get(`tasks/?search=${search}&status=${status}`)
      .then((res) => {
        setTasks(res.data.results || res.data);
      });
  }, [search, status]);

  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task")) {
      await axiosInstance.delete(`tasks/${id}/`);
      fetchTasks();
    }
  };

  return (
    <div className="container">
      <h1>Your Tasks</h1>
      <div className="filters">
        <input
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <Link to="/create-task" className="btn">
        + Add Task
      </Link>
      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks yet. Add one!</p>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={deleteTask} />
          ))
        )}
      </div>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default Dashboard;
