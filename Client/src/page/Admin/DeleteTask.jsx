import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";

// receive through  adminDashboard 
const DeleteTask = ({taskId , refreshTasks , task}) => {
  const { auth } = useAuth();
  const [message , setMessage] = useState("");
   const [openModal, setOpenModal] = useState(false);
  // Only Admin can delete the Task
  // here the user is not admin then only work conditio below
  if(auth.user.role !== 'admin'){
     return (
      <div className="flex justify-center mt-16">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-xl shadow-md font-semibold">
          ❌ Access Denied — Only Admin Can Manage Tasks
        </div>
      </div>
    );
  }
  // Delete Task handler --> Only Admin 
  // after clicking delete button
  // Task Delete through --> Each TaskID
 const deleteTask = async()=>{
    try {
        const res = await axiosInstance.delete(`/task/deleteTask/${taskId}`,{
            headers : {Authorization : `Bearer Token : ${auth.token}`}
        });
        setMessage("Task Deleted Successfully");
        refreshTasks(); // remaining task fetching
    } catch (error) {
        setMessage("Failed To Delete The Task")
    }
 }

  return (
     <>
      {/* Delete Button */}
      <button
        onClick={() => setOpenModal(true)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg 
                   shadow text-sm font-semibold transition-all hover:scale-105"
      >
        🗑 Delete
      </button>

      {/* Modal */}
      {/* When Click Delete Button then open delete popUp Model */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm 
                        flex justify-center items-center z-50">

          <div className="bg-white p-7 rounded-2xl shadow-xl w-[380px]">

            <h2 className="text-xl font-bold text-red-600 mb-4">
              Confirm Delete
            </h2>

            {/* Message */}
            {message && (
              <div
                className={`mb-3 p-3 rounded-lg text-sm font-medium 
                ${message.includes("✔")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"}`}
              >
                {message}
              </div>
            )}

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this task?
              <span className="font-semibold"> This action cannot be undone.</span>
            </p>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 rounded-xl bg-gray-200 text-gray-900 
                           font-semibold hover:bg-gray-300"
              >
                Cancel
              </button>
            {/* when i click Delete Button then task deleted and setmessage(task deleted successfully) */}
              <button
                onClick={deleteTask}
                className="px-5 py-2 rounded-xl bg-red-600 text-white font-semibold 
                           shadow-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteTask;