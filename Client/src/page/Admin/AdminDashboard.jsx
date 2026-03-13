import { useState, useEffect } from "react";
import ViewUser from "./ViewUser";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import TaskManager from "./TaskManager";
import UpdateTask from "./UpdateTask";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import DeleteTask from "./DeleteTask";

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
  if (activeSection === "updateTasks" || activeSection === "deleteTasks") {
    fetchTasks();
  }
}, [activeSection]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ---------- Sidebar ---------- */}
      <aside className="w-64 bg-white shadow-xl p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Admin Panel</h2>

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
          <li
            onClick={() => setActiveSection("deleteTasks")}
            className={`cursor-pointer px-3 py-2 rounded-md transition 
              ${activeSection === "deleteTasks" ? "bg-blue-600 text-white" : "hover:bg-blue-100 text-gray-700"}
            `}
          >
            Delete Task
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
          <div className="mt-6">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 tracking-tight">
              ✏️ Update Tasks
            </h2>
            {/* If no tasks found or length zero then show that message */}
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-lg text-center py-10">
                No tasks available.
              </p>
            ) : (
              // Map all the task and list out in my ui that are fetch through axiosInstance
              <div className="space-y-6">
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    className="p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 
                     rounded-2xl shadow-md hover:shadow-xl transition duration-300"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {task.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      {task.description}
                    </p>

                    {/* Task Metadata if the task assigned to the member then it shows that member email id otherwide not assigned*/}
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <strong className="text-gray-800">Assigned To:</strong>{" "}
                        {task.assignedTo ? (
                          <span className="text-blue-700 font-semibold">
                            {task.assignedTo.name} ({task.assignedTo.email})
                          </span>
                        ) : (
                          <span className="italic text-gray-500">
                            Not assigned
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Update Button */}
                    {/* During Update First Fetch All the tasks after update task fetch the new updated task */}
                    <div className="mt-5 flex justify-end">
                      <UpdateTask
                        taskId={task._id}
                        task={task}
                        refreshTasks={fetchTasks}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* Delete Task Section */}
{activeSection === "deleteTasks" && (
  <div className="mt-6">
    <h2 className="text-3xl font-extrabold text-gray-800 mb-6 tracking-tight">
      🗑 Delete Tasks
    </h2>

    {tasks.length === 0 ? (
      <p className="text-gray-500 text-lg text-center py-10">
        No tasks available.
      </p>
      // Map and list out all the task and task details
    ) : (
      <div className="space-y-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md 
                       hover:shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>

            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {task.description}
            </p>

            <div className="mt-4 flex justify-end">
              <DeleteTask
                taskId={task._id}
                refreshTasks={fetchTasks}
              />
            </div>
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
