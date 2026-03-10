import { useState } from "react";
import ViewUser from "./ViewUser";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("manageUsers");

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
              ${activeSection === "manageUsers" 
                ? "bg-blue-600 text-white" 
                : "hover:bg-blue-100 text-gray-700"
              }`}
          >
            View All Users
          </li>
        </ul>

        {/* Manage Task */}
        <p className="text-gray-500 text-sm mb-2">MANAGE TASK</p>
        <ul>
          <li
            onClick={() => setActiveSection("manageTasks")}
            className={`cursor-pointer px-3 py-2 rounded-md transition 
              ${activeSection === "manageTasks" 
                ? "bg-blue-600 text-white" 
                : "hover:bg-blue-100 text-gray-700"
              }`}
          >
            Manage Tasks
          </li>
        </ul>

      </aside>

      {/* ---------- Right Section ---------- */}
      <main className="flex-1 p-6">

        {/* ✔ Show All Users Section */}
        {activeSection === "manageUsers" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
            <ViewUser />
          </div>
        )}

        {/* ✔ Manage Tasks Section */}
        {activeSection === "manageTasks" && (
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Manage Tasks</h2>
            <p className="text-gray-600">
              Task-related operations will appear here.
            </p>
          </div>
        )}

      </main>

    </div>
  );
};

export default AdminDashboard;