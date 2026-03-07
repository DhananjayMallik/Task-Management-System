import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const MemberDashboard = () => {

  const { auth } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyTasks = async () => {
    try {
      // here we fetched the assigning task of that member
      const res = await axiosInstance.get("/task/getMyTask");
      // get that tasks list
      const myTasks =
        res.data.tasks ||
        res.data.data ||
        res.data.assignedTasks ||
        [];
      // save and show in my ui
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

      const res = await axiosInstance.put(
        `/task/updateStatus/${taskId}`,
        { status: newStatus }
      );

      console.log("Status Updated:", res.data);

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

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold">Member Dashboard</h1>
        <p className="text-sm opacity-80 mt-1">
          Manage and track your assigned tasks
        </p>
      </div>

      {/* User Info Card */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8 border">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Profile Information
        </h2>

        <div className="grid md:grid-cols-3 gap-4 text-gray-700">

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-semibold">{auth?.user?.name}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold">{auth?.user?.email}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-semibold capitalize">{auth?.user?.role}</p>
          </div>

        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-white shadow-md rounded-xl p-6 border">

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

            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">

              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Change Status</th>
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

                    {/* Status Badge */}

                    <td className="p-3 text-center">

                      <span
                        className={`px-3 py-1 text-sm rounded-full font-medium
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

                    {/* Dropdown */}

                    <td className="p-3 text-center">

                      <select
                        className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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