/* View All Users */
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
const ViewUser = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Here We Fetch All the User Details --> Only Admin Can Perform that Operation
  const fetchAllUsers = async () => {
    try {
      const res = await axiosInstance.get("/user/all-Users", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      setUsers(res.data.users || []);  // Get All The User Details
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch users.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-white p-6 shadow-xl rounded-2xl border border-gray-200">

      {/* <h2 className="text-3xl font-bold text-gray-800 mb-6">
        👥 All Users
      </h2> */}
       <div className="flex justify-between items-center mb-6">
  <h2 className="text-3xl text-gray-800 font-bold">
    👥 All Users
  </h2>

  <Link
    to="/login"
    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
  >
    Go Home
  </Link>
</div>
      {/* Loading */}
      {loading && (
        <div className="my-4 text-center text-gray-500 animate-pulse">
          Fetching users…
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500 bg-red-100 p-2 rounded-md">{error}</p>
      )}

      {/* No Users */}
      {!loading && users.length === 0 && (
        <p className="text-gray-500">No users found.</p>
      )}

      {/* Users Table */}
      {!loading && users.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">

          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700">
              <tr>
                <th className="p-4 text-left font-semibold">Name</th>
                <th className="p-4 text-left font-semibold">Email</th>
                <th className="p-4 text-left font-semibold">Role</th>
                <th className="p-4 text-left font-semibold">Joined</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t hover:bg-gray-50 transition duration-200"
                >
                  {/* Name */}
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-800">{user.name}</span>
                  </td>

                  {/* Email */}
                  <td className="p-4 text-gray-600 break-all">{user.email}</td>

                  {/* Role Badge */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                    ${user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-green-100 text-green-700"
                        }
                  `}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="p-4 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
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

export default ViewUser;