import { useState, useEffect } from "react";
import ViewUser from "./ViewUser";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import TaskManager from "./TaskManager";
import UpdateTask from "./UpdateTask";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { auth } = useAuth();
  const [activeSection, setActiveSection] = useState("manageUsers");
  const [tasks, setTasks] = useState([]);

  /* Fetch tasks for UpdateTask section */
  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/task/getAllTasks", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      setTasks(res.data.tasks || []);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (activeSection === "updateTasks") {
      fetchTasks();
    }
  }, [activeSection]);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ---------- Sidebar ---------- */}
      <aside className="w-64 bg-white shadow-xl p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Admin Panel
        </h2>

        {/* Manage User */}
        <p className="text-gray-500 text-sm mb-2">MANAGE USER</p>
        <ul className="mb-6">
          <li
            onClick={() => setActiveSection("manageUsers")}
            className={`cursor-pointer px-3 py-2 rounded-md transition 
              ${activeSection === "manageUsers" ? "bg-blue-600 text-white" : "hover:bg-blue-100 text-gray-700"}
            `}
          >
            View All Users
          </li>

          <li
            onClick={() => setActiveSection("updateUsers")}
            className={`cursor-pointer px-3 py-2 rounded-md transition 
              ${activeSection === "updateUsers" ? "bg-blue-600 text-white" : "hover:bg-blue-100 text-gray-700"}
            `}
          >
            Update User
          </li>

          <li
            onClick={() => setActiveSection("deleteUsers")}
            className={`cursor-pointer px-3 py-2 rounded-md transition 
              ${activeSection === "deleteUsers" ? "bg-blue-600 text-white" : "hover:bg-blue-100 text-gray-700"}
            `}
          >
            Delete User
          </li>
        </ul>

        {/* Manage Task */}
        <p className="text-gray-500 text-sm mb-2">MANAGE TASK</p>
        <ul>
          <li
            onClick={() => setActiveSection("createTasks")}
            className={`cursor-pointer px-3 py-2 rounded-md transition 
              ${activeSection === "createTasks" ? "bg-blue-600 text-white" : "hover:bg-blue-100 text-gray-700"}
            `}
          >
            Task Manager
          </li>

          <li
            onClick={() => setActiveSection("updateTasks")}
            className={`cursor-pointer px-3 py-2 rounded-md transition 
              ${activeSection === "updateTasks" ? "bg-blue-600 text-white" : "hover:bg-blue-100 text-gray-700"}
            `}
          >
            Update Task
          </li>
        </ul>
      </aside>

      {/* ---------- Main Section ---------- */}
      <main className="flex-1 p-6">

        {/* Manage Users */}
        {activeSection === "manageUsers" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
            <ViewUser />
          </div>
        )}

        {activeSection === "updateUsers" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Update Users</h2>
            <UpdateUser />
          </div>
        )}

        {activeSection === "deleteUsers" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Delete Users</h2>
            <DeleteUser />
          </div>
        )}

        {/* Task Manager */}
        {activeSection === "createTasks" && (
          <div>
            <TaskManager />
          </div>
        )}

        {/* Update Task Section */}
        {activeSection === "updateTasks" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Update Tasks</h2>

            {tasks.length === 0 ? (
              <p>No tasks available.</p>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task._id} className="bg-white shadow p-4 rounded-xl">
                    <h3 className="font-bold text-lg">{task.title}</h3>
                    <p className="text-gray-600">{task.description}</p>

                    <UpdateTask
                      taskId={task._id}
                      refreshTasks={fetchTasks}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

    </div>
  );
};

export default AdminDashboard;