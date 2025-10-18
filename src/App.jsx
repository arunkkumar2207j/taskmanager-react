import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TaskForm from "./pages/TaskForm";
import EditTask from "./pages/EditTask";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/" />;
}

<ToastContainer />;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          // <PrivateRoute>
          <Dashboard />
          // </PrivateRoute>
        }
      />
      <Route path="/create-task" element={<TaskForm />} />
      <Route path="/edit-task/:id" element={<EditTask />} />
    </Routes>
  );
}

export default App;
