/* View All Users */

import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const ViewUser = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  // set the details which you want to update into editing time
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/user/all-Users", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      setUsers(res.data.users || []);
    } catch (error) {
      console.log("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Edit button handler
  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  // Update user
  const handleUpdate = async () => {
    try {
      await axiosInstance.put(
        `/user/update-user/${editingUser}`,
        formData,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );

      alert("User Updated Successfully!");
      setEditingUser(null);
      fetchUsers();

    } catch (error) {
      console.log("Update error:", error);
      alert("Failed to update");
    }
  };

  return (
    <div className="bg-white p-6 shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        👥 Manage & Update User Info
      </h2>

      {/* Users Table */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t hover:bg-gray-50 transition">
                <td className="p-3">{user.name}</td>
                <td className="p-3 break-all">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleEdit(user)}
                    className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Edit Form */}
      {editingUser && (
        <div className="mt-8 bg-gray-50 p-6 rounded-xl border shadow-md">
          <h3 className="text-xl font-semibold mb-4">✏️ Update User Details</h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 font-medium">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Role</label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full mt-1 p-2 border rounded-lg"
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleUpdate}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Update User
          </button>

          <button
            onClick={() => setEditingUser(null)}
            className="mt-6 ml-4 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      )}

    </div>
  );
};

export default ViewUser;