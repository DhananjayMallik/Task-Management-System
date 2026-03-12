import * as Yup from "yup";

// Create Task Validation Schema
export const createTaskSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters")
    .required("Title is required"),

  description: Yup.string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters")
    .required("Task description is required"),
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
export const updateTaskDetails = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters")
    .optional(),

  description: Yup.string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
});