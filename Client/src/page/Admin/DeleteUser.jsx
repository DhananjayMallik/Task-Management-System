import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axiosInstance";

const DeleteUser = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // step 1 : Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/user/all-Users", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      setUsers(res.data.users || []);
      setLoading(false);

    } catch (error) {
      setError("Failed to fetch users",error);
      setLoading(false);
    }
  };

  // Delete user
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure?")) return;

  try {
    await axiosInstance.delete(`/user/delete/${id}`, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });

    alert("User Deleted Successfully.");
    fetchUsers();

  } catch (err) {
    alert("Delete failed");
    console.log(err);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-white p-6 shadow-xl rounded-2xl border border-gray-200">

      <h4 className="text-3xl text-gray-800 mb-6 font-bold">
        👥 Delete Any User
      </h4>

      {loading && <p className="text-gray-500">Fetching users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {users.length > 0 && (
        <div className="overflow-x-auto border rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </td>

                  <td className="p-4 break-all">{user.email}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <button
                     onClick={() => handleDelete(user._id)} 
                      className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default DeleteUser;