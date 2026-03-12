import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axiosInstance";

const CreateTask = () => {
  const { auth } = useAuth();

  // If user is not admin
  if (auth.user.role !== "admin") {
    return (
      <div className="flex justify-center mt-16">
        <div className="bg-red-100 border border-red-300 text-red-700 px-6 py-4 rounded-xl shadow-md text-lg font-semibold">
          ❌ Access Denied — Only Admin Can Create Tasks
        </div>
      </div>
    );
  }

  // Form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      await axiosInstance.post(
        "/task/createTask",
        {
          ...formData,
          createdBy: auth.user._id,
        },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );

      // Success message
      setMessage({
        type: "success",
        text: "✔️ Task Created Successfully!",
      });

      // Auto-hide after 2 seconds
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 2000);

      // Clear inputs
      setFormData({ title: "", description: "" });

    } catch (error) {
      setMessage({ type: "error", text: "❌ Failed to create task" });
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 2000);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl transition-all">

      {/* Header */}
      <h2 className="text-4xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
        📝 Create Task
      </h2>

      {/* Message Alert */}
      {message.text && (
        <div
          className={`p-4 mb-6 rounded-lg shadow-md text-sm font-semibold animate-fadeIn 
            ${
              message.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
        >
          {message.text}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Title */}
        <div>
          <label className="text-gray-700 font-semibold">Task Title</label>
          <input
            type="text"
            required
            placeholder="Enter task title..."
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg 
                       shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-gray-700 font-semibold">Task Description</label>
          <textarea
            required
            rows="4"
            placeholder="Describe the task..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg 
                       shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold 
                     hover:bg-blue-700 shadow-lg hover:shadow-2xl cursor-pointer 
                     transform transition-all hover:-translate-y-0.5"
        >
          ➕ Create Task
        </button>

      </form>
    </div>
  );
};

export default CreateTask;