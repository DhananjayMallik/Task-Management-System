import * as Yup from 'yup';
// create task schema validation 
export const createTask = Yup.object({
  body: Yup.object({

    // Task title
    title: Yup.string()
      .required("Title is required"),

    // Task description
    description: Yup.string()
      .required("Task description is required"),

    // Task status
    status: Yup.string()
      .oneOf(['pending', 'in-progress', 'completed'], 'Invalid status')
      .required("Status is required"),

    // Assigned user must be a valid MongoDB ObjectId
    assignedTo: Yup.string()
      .matches(/^[0-9a-fA-F]{24}$/, "Invalid User ID")
      .required("Assigned user ID is required"),

    // Creator user (also ObjectId)
    createdBy: Yup.string()
      .matches(/^[0-9a-fA-F]{24}$/, "Invalid Creator ID")
      .required("Creator user ID is required")
  }),
});
// update task schema validation
export const updateTask = Yup.object({
    body : Yup.object({
        title : Yup.string(),
        description : Yup.string(),
        status: Yup.string()
      .oneOf(['pending', 'in-progress', 'completed'], 'Invalid status'),
      assignedTo : Yup.string()
      .matches(/^[0-9a-fA-F]{24}$/, "Invalid User ID"),
      
    }),
});