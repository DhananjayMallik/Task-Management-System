/*
{
    "title": "Fix backend Set up",
    "description": " validation issue",
    "createdBy": "69a51f52102bb801d3b91a2d"
} 
during Task Creation Only Admin Can Create Task Any Member Can't Create Task 
*/
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axiosInstance";
const CreateTask = () => {
  // Only Admin Can Create a Task
  const { auth } = useAuth();
  // if the loggedInuser is not admin then only
  if (auth.user.role !== "admin") {
    return (
      <div className="text-center mt-10 text-red-600 text-lg font-semibold">
        ❌ Only Admin Can Create Tasks
      </div>
    );
  }
  // if the user is admin then only he or she can create task
  // make a default value of the task section
  const [FormData, setFormData] = useState({
    title: " ",
    description: " ",
  });
  // Then After Creation of task show the message
  const [message, setMessage] = useState("");
  // handle task creation button
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axiosInstance.post(
        "/task/createTask",
        {
          ...FormData,
          createdBy: auth.user._id,
        },
        {
          headers: { Authorization: `Bearer Token : ${auth.token}` },
        },
      );
      setMessage(" ✅ Task Created Successfull");
      setFormData({ title: " ", description: " " });
    } catch (error) {
      alert(" ❌ Failed To Create Task", error);
    }
  };
  return (
    <div className="bg-white p-6 shadow-xl rounded-2xl border border-gray-200 max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        📝 Create New Task
      </h2>

      {message && (
        <div
          className={`p-3 mb-4 rounded-lg text-white ${
            message.includes("Failed") ? "bg-red-500" : "bg-green-600"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="text-gray-700 font-medium">Task Title</label>
          <input
            type="text"
            required
            value={FormData.title}
            onChange={(e) =>
              setFormData({ ...FormData, title: e.target.value })
            }
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-gray-700 font-medium">Task Description</label>
          <textarea
            required
            rows="4"
            value={FormData.description}
            onChange={(e) =>
              setFormData({ ...FormData, description: e.target.value })
            }
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold cursor-pointer"
        >
          📝 Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
