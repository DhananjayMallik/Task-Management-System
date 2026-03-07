import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MemberDashboard = () => {

  const { auth, setAuth } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    alert("logout Successfully");
    navigate("/login");
  };

  const fetchMyTasks = async () => {
    try {
      const res = await axiosInstance.get("/task/getMyTask");

      const myTasks =
        res.data.tasks ||
        res.data.data ||
        res.data.assignedTasks ||
        [];

      setTasks(myTasks);
      setLoading(false);

    } catch (error) {
      console.log("Task fetch error:", error);
      setTasks([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const updateStatus = async (taskId, newStatus) => {
    try {

      await axiosInstance.put(
        `/task/updateStatus/${taskId}`,
        { status: newStatus }
      );

      fetchMyTasks();

    } catch (error) {
      console.log(
        "Status update error:",
        error.response?.data || error.message
      );
    }
  };

  if (!auth?.token) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Please Login
      </div>
    );
  }

  const pending = tasks.filter(t => t.status === "pending").length;
  const progress = tasks.filter(t => t.status === "in-progress").length;
  const completed = tasks.filter(t => t.status === "completed").length;
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg p-6 mb-8 flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">Member Dashboard</h1>
          <p className="text-sm opacity-90">
            Manage and track your assigned tasks
          </p>
        </div>

       <div className="relative group flex items-center gap-3 cursor-pointer">

  {/* Avatar */}
  <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
    {auth?.user?.name?.charAt(0)}
  </div>

  <span className="font-medium">{auth?.user?.name}</span>

  {/* Hover Card */}
  <div className="absolute right-0 top-12 w-52 bg-white text-gray-700 rounded-lg shadow-lg p-4 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300">

    <p className="text-sm text-gray-500">Email</p>
    <p className="font-medium mb-2">{auth?.user?.email}</p>

    <p className="text-sm text-gray-500">Role</p>
    <p className="font-medium capitalize">{auth?.user?.role}</p>

  </div>
<div className="absolute right-0 top-12 w-56 bg-white text-gray-700 rounded-lg shadow-lg p-4 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300">

  <p className="text-sm text-gray-500">Email</p>
  <p className="font-medium mb-2">{auth?.user?.email}</p>

  <p className="text-sm text-gray-500">Role</p>
  <p className="font-medium capitalize mb-3">{auth?.user?.role}</p>

  <hr className="my-2"/>

  <button
    onClick={handleLogout}
    className="w-full text-left text-red-500 font-semibold hover:bg-red-100 px-2 py-1 rounded transition cursor-pointer"
  >
    Logout
  </button>

</div>
</div>

      </div>

      {/* Task Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white shadow-md rounded-xl p-5 border">
          <p className="text-gray-500 text-sm">Pending Tasks</p>
          <h2 className="text-3xl font-bold text-red-500">{pending}</h2>
        </div>

        <div className="bg-white shadow-md rounded-xl p-5 border">
          <p className="text-gray-500 text-sm">In Progress</p>
          <h2 className="text-3xl font-bold text-yellow-500">{progress}</h2>
        </div>

        <div className="bg-white shadow-md rounded-xl p-5 border">
          <p className="text-gray-500 text-sm">Completed</p>
          <h2 className="text-3xl font-bold text-green-500">{completed}</h2>
        </div>

      </div>

      {/* Tasks Table */}

      <div className="bg-white shadow-lg rounded-xl p-6 border">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-xl font-semibold text-gray-700">
            My Assigned Tasks
          </h2>

          <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
            {tasks.length} Tasks
          </span>

        </div>

        {loading ? (
          <p className="text-gray-500">Loading Tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500">No Tasks Assigned</p>
        ) : (

          <div className="overflow-x-auto">

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

                  <tr
                    key={task._id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                    <td className="p-3 font-medium text-gray-700">
                      {task.title}
                    </td>

                    <td className="p-3 text-gray-600">
                      {task.description}
                    </td>

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
                        className="border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500"
                        value={task.status}
                        onChange={(e) =>
                          updateStatus(task._id, e.target.value)
                        }
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

        )}

      </div>

    </div>
  );
};

export default MemberDashboard;