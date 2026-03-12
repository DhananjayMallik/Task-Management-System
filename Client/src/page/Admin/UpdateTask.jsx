import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const UpdateTask = ({ taskId, refreshTasks }) => {
  const { auth } = useAuth();

  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Update Task States
  const [updateData , setUpdateData] = useState({
    title : "",
    description :""
  });

  // PopUp Model fro edit task details
  const openModalHandler = () => {
    setOpenModal(true)
  }
// update Task Handler --> Only Admin Can update the task 
const updateTasks = async(e) => {
  e.preventDefault();
  setMessage("");
  try {
    const res = await axiosInstance.put(`/task/updateTaskDetails/${taskId}`,
      {...updateData},
      {headers : {Authorization : `Bearer Token : ${auth.token}`}}
    );
    setMessage("Task Update Successfull");
    setUpdateData({title : "",description : ""})
    refreshTasks(); // fetch tasks after edit
    setTimeout(() => {
      setMessage();
    }, 3000);
  } catch (error) {
    setMessage("Failed To Update Task")
  }
}
  return (
    <>
      {/* Edit Button */}
      <button
        onClick={openModalHandler}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
      >
        Edit
      </button>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

          <div className="bg-white p-8 rounded-xl shadow-xl w-96">

            <h2 className="text-xl font-semibold mb-4">
              Update Task
            </h2>

            {loading ? (
              <p className="text-center text-gray-600">Loading...</p>
            ) : (
              <>
                {message && (
                  <div className="mb-3 text-sm text-green-600">
                    {message}
                  </div>
                )}

                <form onSubmit={updateTasks} className="space-y-4">

                  <input
                    type="text"
                    value={updateData.title}
                    onChange={(e) =>
                      setUpdateData({
                        ...updateData,
                        title: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Task Title"
                  />

                  <textarea
                    rows="3"
                    value={updateData.description}
                    onChange={(e) =>
                      setUpdateData({
                        ...updateData,
                        description: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Task Description"
                  />

                  <div className="flex justify-end gap-3">

                    <button
                      type="button"
                      onClick={() => setOpenModal(false)}
                      className="px-4 py-2 bg-gray-400 text-white rounded"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      Update
                    </button>

                  </div>
                </form>
              </>
            )}

          </div>

        </div>
      )}
    </>
  );
};

export default UpdateTask;