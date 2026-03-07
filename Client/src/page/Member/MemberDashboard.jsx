import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const MemberDashboard = () => {

  const { auth } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch member tasks
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

  // Update task status
const updateStatus = async (taskId, newStatus) => {
  try {
      // fetch that task that i want to update the status 
    const res = await axiosInstance.put(
      `/task/updateStatus/${taskId}`,
      // here we sent a new Status of that task
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

  if (!auth?.token) return <p className="text-center mt-10">Please Login</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Member Info */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">

        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Member Dashboard
        </h1>

        <p className="text-lg">
          <strong>Name:</strong> {auth?.user?.name}
        </p>

        <p className="text-lg">
          <strong>Email:</strong> {auth?.user?.email}
        </p>

        <p className="text-lg">
          <strong>Role:</strong> {auth?.user?.role}
        </p>

      </div>

      {/* Tasks Table */}

      <div className="bg-white shadow-md rounded-lg p-6">

        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          My Assigned Tasks
        </h2>

        {loading ? (
          <p>Loading Tasks...</p>
        ) : tasks.length === 0 ? (
          <p>No Tasks Assigned</p>
        ) : (

          <table className="w-full border border-gray-300">

            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Change Status</th>
              </tr>
            </thead>

            <tbody>
  {tasks.map((task) => (
    <tr key={task._id} className="text-center hover:bg-gray-100">

      <td className="border p-3">
        {task.title}
      </td>

      <td className="border p-3">
        {task.description}
      </td>

      <td className="border p-3">
       <span
  className={`px-2 py-1 rounded text-white
  ${
    task.status === "pending"
      ? "bg-red-500"
      : task.status === "in-progress"
      ? "bg-yellow-500"
      : "bg-green-500"
  }`}
>
  {task.status === "pending"
    ? "Pending"
    : task.status === "in-progress"
    ? "In Progress"
    : "Completed"}
</span>
      </td>

      <td className="border p-3">
        <select
  className="border rounded p-1"
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

        )}

      </div>

    </div>
  );
};

export default MemberDashboard;