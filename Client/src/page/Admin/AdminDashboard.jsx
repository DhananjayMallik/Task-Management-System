/* Here we write our Full admin dashboard 
Admin Can manage All the User and as well as also 
manage Task */
import { useState } from "react";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("manageUsers");

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
            className="sidebar-item"
          >
            Manage Users
          </li>
        </ul>

        {/* Manage Task */}
        <p className="text-gray-500 text-sm mb-2">MANAGE TASK</p>
        <ul>
          <li
            onClick={() => setActiveSection("manageTasks")}
            className="sidebar-item"
          >
            Manage Tasks
          </li>
        </ul>

      </aside>

      {/* ---------- Right Content ---------- */}
      <main className="flex-1 p-6">

        {activeSection === "manageUsers" && (
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Manage Users</h2>
            <p className="text-gray-600">User-related operations will appear here.</p>
          </div>
        )}

        {activeSection === "manageTasks" && (
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Manage Tasks</h2>
            <p className="text-gray-600">Task-related operations will appear here.</p>
          </div>
        )}

      </main>

    </div>
  );
};

export default AdminDashboard;