import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import "../../styles/circleAnimation.css";
const MemberDashboard = () => {
  const { auth, setAuth } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    alert("Logout Successfully");
    navigate("/login");
  };

  const fetchMyTasks = async () => {
    try {
      const res = await axiosInstance.get("/task/getMyTask");
      const myTasks =
        res.data.tasks || res.data.data || res.data.assignedTasks || [];
      setTasks(myTasks);
      setLoading(false);
    } catch (error) {
      setTasks([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const updateStatus = async (taskId, newStatus) => {
    try {
      await axiosInstance.put(`/task/updateStatus/${taskId}`, {
        status: newStatus,
      });
      fetchMyTasks();
    } catch (error) {
      console.log(error);
    }
  };

  if (!auth?.token) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Please Login
      </div>
    );
  }

  const pending = tasks.filter((t) => t.status === "pending").length;
  const progress = tasks.filter((t) => t.status === "in-progress").length;
  const completed = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg p-4 sm:p-5 md:p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Member Dashboard</h1>
          <p className="text-xs sm:text-sm opacity-90">Manage and track your assigned tasks</p>
        </div>

        {/* Avatar + Dropdown */}
        <div className="relative group flex items-center gap-3 cursor-pointer w-full sm:w-auto">

          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-lg shrink-0">
            {auth?.user?.name?.charAt(0)}
          </div>

          <span className="font-medium text-sm sm:text-base truncate max-w-[120px] sm:max-w-none">
            {auth?.user?.name}
          </span>

          {/* Dropdown */}
          <div className="absolute right-0 top-12 w-48 sm:w-56 bg-white text-gray-700 rounded-lg shadow-lg p-4 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 z-50">

            <p className="text-xs sm:text-sm text-gray-500">Email</p>
            <p className="font-medium mb-2 break-all">{auth?.user?.email}</p>

            <p className="text-xs sm:text-sm text-gray-500">Role</p>
            <p className="font-medium capitalize mb-3">{auth?.user?.role}</p>

            <hr className="my-2" />

            <button
              onClick={handleLogout}
              className="w-full text-left text-red-500 font-semibold hover:bg-red-100 px-2 py-1 rounded text-xs"
            >
              Logout
            </button>

          </div>
        </div>

      </div>

      {/* Animated Circles */}
      <div className="mt-8 flex flex-wrap justify-center gap-5 sm:gap-8 md:gap-10">

        <div className="circleBox circle-animate w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-red-100 flex flex-col items-center justify-center shadow-lg">
          <div className="text-2xl md:text-3xl font-bold text-red-600">{pending}</div>
          <p className="text-xs sm:text-sm text-red-600 font-semibold">Pending</p>
        </div>

        <div className="circleBox circle-animate w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-yellow-100 flex flex-col items-center justify-center shadow-lg">
          <div className="text-2xl md:text-3xl font-bold text-yellow-600">{progress}</div>
          <p className="text-xs sm:text-sm text-yellow-600 font-semibold">In Progress</p>
        </div>

        <div className="circleBox circle-animate w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-green-100 flex flex-col items-center justify-center shadow-lg">
          <div className="text-2xl md:text-3xl font-bold text-green-600">{completed}</div>
          <p className="text-xs sm:text-sm text-green-600 font-semibold">Completed</p>
        </div>

      </div>

      {/* Task Table */}
      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-5 md:p-6 border mt-10">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700">
            My Assigned Tasks
          </h2>

          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {tasks.length} Tasks
          </span>
        </div>

       {/* Responsive Table / Card View */}
{loading ? (
  <p className="text-gray-500 text-xs sm:text-sm">Loading Tasks...</p>
) : tasks.length === 0 ? (
  <p className="text-gray-500 text-xs sm:text-sm">No Tasks Assigned</p>
) : (
  <div>

    {/* Desktop Table (hidden on mobile) */}
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Update</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="border-t hover:bg-gray-50 transition">
              <td className="p-3 font-medium text-gray-700">{task.title}</td>
              <td className="p-3 text-gray-600">{task.description}</td>
              <td className="p-3 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    task.status === "pending"
                      ? "bg-red-100 text-red-600"
                      : task.status === "in-progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {task.status === "pending"
                    ? "Pending"
                    : task.status === "in-progress"
                    ? "In Progress"
                    : "Completed"}
                </span>
              </td>

              <td className="p-3 text-center">
                <select
                  className="border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                  value={task.status}
                  onChange={(e) => updateStatus(task._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile Cards (visible only on mobile) */}
    <div className="md:hidden space-y-4 mt-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white p-4 rounded-lg shadow border"
        >
          <p className="text-sm font-semibold text-gray-800">
            {task.title}
          </p>

          <p className="text-xs text-gray-600 mt-1">
            {task.description}
          </p>

          <div className="flex justify-between items-center mt-3">
            <span
              className={`px-2 py-1 rounded-full text-[10px] font-semibold
              ${
                task.status === "pending"
                  ? "bg-red-100 text-red-600"
                  : task.status === "in-progress"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {task.status === "pending"
                ? "Pending"
                : task.status === "in-progress"
                ? "In Progress"
                : "Completed"}
            </span>

            <select
              className="border rounded px-2 py-1 text-[10px]"
              value={task.status}
              onChange={(e) => updateStatus(task._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      ))}
    </div>

  </div>
)}
    
      </div>

    </div>
  );
};

export default MemberDashboard;