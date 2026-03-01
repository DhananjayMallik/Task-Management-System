import * as Yup from "yup";

// Create Task Validation Schema
export const createTaskSchema = Yup.object({
  title: Yup.string().required("Title is required"),

  description: Yup.string().required("Task description is required"),

  status: Yup.string()
    .oneOf(["pending", "in-progress", "completed"], "Invalid status")
    .required("Status is required"),

  assignedTo: Yup.string()
    .matches(/^[0-9a-fA-F]{24}$/, "Invalid User ID")
    .required("Assigned user ID is required"),
});

// Update Task Schema
export const updateTaskSchema = Yup.object({
  title: Yup.string(),

  description: Yup.string(),

  status: Yup.string().oneOf(
    ["pending", "in-progress", "completed"],
    "Invalid status"
  ),

  assignedTo: Yup.string().matches(/^[0-9a-fA-F]{24}$/, "Invalid User ID"),
});