import React from "react";
import { Link } from "react-router-dom";

function TaskCard({ task, onDelete }) {
  return (
    <div className="task-card">
      <table style={{ width: "700px", alignContent: "flex-start" }}>
        <tbody>
          <tr>
            <td>{task.id}</td>
            <td>
              <h3>{task.title}</h3>
            </td>
            <td>
              <p>{task.description}</p>
            </td>
            <td>
              <span>{task.status}</span>
            </td>
            <td>
              <div className="actions">
                <Link to={`/edit-task/${task.id}`} className="btn">
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(task.id)}
                  className="btn delete"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
    </div>
  );
}

export default TaskCard;
