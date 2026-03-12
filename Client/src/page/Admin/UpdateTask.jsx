import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";

// receive into adminDashboard 
const UpdateTask = ({ taskId, refreshTasks, task }) => {
  const { auth } = useAuth();

  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
// update task states
  const [updateData, setUpdateData] = useState({
    title: "",
    description: "",
  });

  // Prefilled task data when modal opens
  useEffect(() => {
    if (task) {
      setUpdateData({
        title: task.title || "",
        description: task.description || "",
      });
    }
  }, [task]);

  // popUp model for edit task
  const openModalHandler = () => {
    setOpenModal(true);
  };

  // Update Task handler --> Only Admin
  const updateTasks = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axiosInstance.put(
        `/task/updateTaskDetails/${taskId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      setMessage("✔ Task Updated Successfully");

      refreshTasks(); // after update task details

      setTimeout(() => {
        setMessage("");
        setOpenModal(false);
      }, 1500);

    } catch (error) {
      setMessage("❌ Failed To Update Task");
    }
  };

  return (
    <>
      {/* Edit Button */}
      <button
        onClick={openModalHandler}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-lg shadow-md text-sm font-semibold transition"
      >
        ✏️ Edit
      </button>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">

          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[420px]">

            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold text-gray-800">
                Update Task
              </h2>

              <button
                onClick={() => setOpenModal(false)}
                className="text-gray-500 hover:text-gray-800 text-xl"
              >
                ✖
              </button>
            </div>

            {message && (
              <div className="mb-3 text-sm font-semibold text-green-700 bg-green-50 border border-green-200 p-2 rounded">
                {message}
              </div>
            )}

            <form onSubmit={updateTasks} className="space-y-5">

              {/* Title */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Task Title
                </label>

                <input
                  type="text"
                  value={updateData.title}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      title: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Description
                </label>

                <textarea
                  rows="4"
                  value={updateData.description}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      description: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                >
                  Update
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateTask;