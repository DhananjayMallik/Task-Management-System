import * as Yup from "yup";

// Create Task Validation Schema
export const createTaskSchema = Yup.object({
  title: Yup.string().required("Title is required"),

  description: Yup.string().required("Task description is required"),
});
// assign Task only admin
export const assignTaskSchema = Yup.object().shape({
  assignedTo: Yup.string().required("AssignedTo userId is required"),
});

// Update Task Schema
export const updateTaskSchema = Yup.object({
  status: Yup
    .string()
    .oneOf(["pending", "in-progress", "completed"])
    .required("Status is required"),
});