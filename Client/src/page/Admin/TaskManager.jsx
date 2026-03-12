import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axiosInstance";

const TaskManager = () => {
  const { auth } = useAuth();

  // Only admin can use this page
  // if the loggedInUser Is not admin then Only 
  if (auth.user.role !== "admin") {
    return (
      <div className="flex justify-center mt-16">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-xl shadow-md font-semibold">
          ❌ Access Denied — Only Admin Can Manage Tasks
        </div>
      </div>
    );
  }

  // Tabs
  const [activeTab, setActiveTab] = useState("create"); // default tabs is create

  // States
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState("");

  // Create Task state and also by default Value
  const [createData, setCreateData] = useState({
    title: "",
    description: "",
  });

  // Assign Task state --> here we define in which task will assign at whom
  const [assignTaskId, setAssignTaskId] = useState("");
  const [assignToUser, setAssignToUser] = useState("");

  // Fetch AllThe tasks -> without fetching all tasks we will not get task update -->Only Admin Can Manage This
const fetchTasks = async () => {
  try {
    const res = await axiosInstance.get("/task/getAllTasks", {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    
    setTasks(Array.isArray(res.data.tasks) ? res.data.tasks : []);
  } catch (err) {
    console.log("Error loading tasks:", err);
    setTasks([]); // fallback
  }
};

  // Fetch members  --> over all the user only fetch who are the member --> Only Admin Can Manage This
  const fetchMembers = async () => {
    try {
      const res = await axiosInstance.get("/user/all-Users", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      // filter only member if member then fetch
      setMembers(res.data.users.filter((u) => u.role === "member"));
    } catch (err) {
      console.log("Error loading users:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchMembers();
  }, []);

  // Create Task --> Only Admin Can Create Task No one Can Create Task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axiosInstance.post(
        "/task/createTask",
        { ...createData, createdBy: auth.user._id },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );

      setMessage("✔ Task Created Successfully!");
      setCreateData({ title: "", description: "" });

      fetchTasks(); // refresh list
      setTimeout(() => setMessage(""), 2500);
    } catch (err) {
      setMessage("❌ Failed to create task");
    }
  };

  // Assign Task --> Only Admin Can Assign the created Task
  const handleAssignTask = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axiosInstance.put(
        `/task/assign/${assignTaskId}`,
        { assignedTo: assignToUser },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );

      setMessage("✔ Task Assigned Successfully!");

      setAssignTaskId("");
      setAssignToUser("");
      fetchTasks();

      setTimeout(() => setMessage(""), 2500);
    } catch (err) {
      setMessage("❌ Failed to assign task");
    }
  };

  return (
  <div className="max-w-4xl mx-auto mt-12 bg-white shadow-2xl rounded-3xl border border-gray-200 p-10">

  {/* Header */}
  <h1 className="text-3xl font-extrabold text-gray-800 mb-8 tracking-tight">
    📌 Task Management Dashboard
  </h1>

  {/* Tabs */}
  <div className="flex gap-3 mb-8">
    {[
      { key: "create", label: "➕ Create Task" },
      { key: "all", label: "📋 All Tasks" },
      { key: "assign", label: "🔗 Assign Task" },
    ].map((tab) => (
      <button
        key={tab.key}
        onClick={() => setActiveTab(tab.key)}
        className={`px-5 py-2.5 rounded-xl font-semibold transition shadow-sm ${
          activeTab === tab.key
            ? "bg-blue-600 text-white shadow-lg scale-105"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>

  {/* Alerts */}
  {message && (
    <div
      className={`p-4 mb-6 rounded-xl text-white font-semibold shadow-md ${
        message.includes("✔") ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {message}
    </div>
  )}

  {/* Create Task */}
  {activeTab === "create" && (
    <form onSubmit={handleCreateTask} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        📝 Create a New Task
      </h2>

      <div>
        <label className="font-semibold text-gray-700">Task Title</label>
        <input
          type="text"
          required
          value={createData.title}
          onChange={(e) =>
            setCreateData({ ...createData, title: e.target.value })
          }
          placeholder="Enter task title"
          className="w-full p-3 mt-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="font-semibold text-gray-700">Description</label>
        <textarea
          rows="4"
          required
          value={createData.description}
          onChange={(e) =>
            setCreateData({ ...createData, description: e.target.value })
          }
          placeholder="Enter task description"
          className="w-full p-3 mt-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-2xl transition-transform hover:-translate-y-0.5 font-semibold"
      >
        Create Task
      </button>
    </form>
  )}

  {/* All Tasks */}
{activeTab === "all" && (
  <div>
    <h2 className="text-3xl font-extrabold text-gray-800 mb-6 tracking-tight">
      📋 All Tasks Overview
    </h2>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 shadow-sm">
        <p className="text-sm text-blue-700 font-semibold">Total Tasks</p>
        <h3 className="text-2xl font-bold text-blue-900">{tasks.length}</h3>
      </div>
      <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-200 shadow-sm">
        <p className="text-sm text-yellow-700 font-semibold">Assigned</p>
        <h3 className="text-2xl font-bold text-yellow-900">
          {tasks.filter((t) => t.assignedTo).length}
        </h3>
      </div>
      <div className="bg-gray-100 p-4 rounded-2xl border border-gray-300 shadow-sm">
        <p className="text-sm text-gray-700 font-semibold">Unassigned</p>
        <h3 className="text-2xl font-bold text-gray-900">
          {tasks.filter((t) => !t.assignedTo).length}
        </h3>
      </div>
    </div>

    {/* Task List */}
    <div className="space-y-6">
      {tasks.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-10">
          No tasks found.
        </div>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-300 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>

              <span
                className={`px-4 py-1.5 text-sm rounded-full font-semibold shadow-sm ${
                  task.assignedTo
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {task.assignedTo ? "Assigned" : "Not Assigned"}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700">{task.description}</p>

            {/* Assignment Info */}
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                <strong className="text-gray-800">Created By:</strong>{" "}
                {task.createdBy
                  ? `${task.createdBy.name} (${task.createdBy.email})`
                  : "Unknown"}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                <strong className="text-gray-800">Assigned To:</strong>{" "}
                {task.assignedTo ? (
                  <span className="text-blue-800 font-semibold">
                    {task.assignedTo.name} ({task.assignedTo.email})
                  </span>
                ) : (
                  <span className="text-gray-500 italic">Not Assigned</span>
                )}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => {
                  setActiveTab("assign");
                  setAssignTaskId(task._id);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition"
              >
                Assign / Reassign
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
)}

  {/* Assign Task */}
  {activeTab === "assign" && (
    <form onSubmit={handleAssignTask} className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        🔗 Assign Task to Member
      </h2>

      {/* Task Dropdown */}
      <div>
        <label className="font-semibold text-gray-700">Select Task</label>
        <select
          required
          value={assignTaskId}
          onChange={(e) => setAssignTaskId(e.target.value)}
          className="w-full p-3 mt-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Choose a task</option>
          {tasks.map((task) => (
            <option key={task._id} value={task._id}>
              {task.title}
            </option>
          ))}
        </select>
      </div>

      {/* Member Dropdown */}
      <div>
        <label className="font-semibold text-gray-700">Assign To Member</label>
        <select
          required
          value={assignToUser}
          onChange={(e) => setAssignToUser(e.target.value)}
          className="w-full p-3 mt-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Choose member</option>
          {members.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name} ({m.email})
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-2xl transition-transform hover:-translate-y-0.5 font-semibold"
      >
        Assign Task
      </button>
    </form>
  )}
</div>
  );
};

export default TaskManager;