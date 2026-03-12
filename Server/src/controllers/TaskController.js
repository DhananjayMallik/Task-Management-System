import Task from '../models/Task.js'
import {
  createTaskSchema,
  updateTaskSchema,
  assignTaskSchema
} from '../validation/TaskValidation.js'
import User from '../models/User.js';
// get my tasks only those that have been assigned : only member assigning task details
export const GetMyTasks = async (req, res) => {
  try {
    // get that user details -> assigned the task through admin
    const tasks = await Task.find({ assignedTo: req.user._id }).populate(
      'assignedTo',
      'name email'
    )
    if (!tasks) {
      return res.status(400).json({
        success: false,
        message: 'Not Found Assigning Task to that Member Peerson',
      })
    }
    return res.status(202).json({
      success: true,
      tasks,
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        errors: error.errors, // Return all validation messages
      })
    }
  }
  return res.status(501).json({
    message: 'Server error',
  })
}

// create task : Admin Only
export const CreateTask = async (req, res) => {
  try {
    // Validate schema
    await createTaskSchema.validate(req.body, { abortEarly: false })

    const { title, description} = req.body

    const task = new Task({
      title,
      description,
      createdBy: req.user._id, // Auto-set
    })

    await task.save()

    return res.status(201).json({
      success: true,
      message: 'Task Created Successfully',
      task,
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        errors: error.errors, // Return all validation messages
      })
    }

    return res.status(500).json({
      success: false,
      message: 'Server error',
    })
  }
}

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    return res.status(200).json({
      success: true,
      tasks: tasks,
    });

  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        errors: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server Error in getAllTasks",
    });
  }
};

export const UpdateTaskStatus = async (req, res) => {
  try {

    await updateTaskSchema.validate(req.body, { abortEarly: false });

    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task Not Found!",
      });
    }

    const loggedInUserId = req.user._id.toString();
    const assignedUserId = task.assignedTo
      ? task.assignedTo.toString()
      : null;

    // Only admin or assigned member can update
    if (req.user.role !== "admin" && assignedUserId !== loggedInUserId) {
      return res.status(403).json({
        success: false,
        message: "You cannot update another user's task",
      });
    }

    task.status = req.body.status;

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task Status Updated Successfully",
      task,
    });

  } catch (error) {

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        errors: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/* Delete Task : Only Admin Can delete the assigned task  */
export const deleteTaskOnlyAdmin = async(req,res) => {
  try {
    const taskId = req.params.id; // fetch that task id that you want to deleted in your history
    // check task exist or not
    if(!taskId){
      return res.status(402).json({
        success : false,
        message : "Task Not Found"
      });
    }
    await Task.findByIdAndDelete(taskId);
    return res.status(201).json({
      success : true,
      message : "Task Deleted Successfully"
    });
  } catch (error) {
     return res.status(404).json({
      success : false,
      errors : error.errors
     });
  }
}

/* Assigned Task : Only Admin Can Assigned the task to member */
/* ---------------------------------------------------
   6) Assign Task to Member (ADMIN ONLY)
--------------------------------------------------- */
export const AssignedTaskOnlyAdmin = async (req, res) => {
  try {
    await assignTaskSchema.validate(req.body, { abortEarly: false });

    const { id } = req.params;
    const { assignedTo } = req.body;

    // Check task exists
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task Not Found",
      });
    }

    // Check member exists
    const user = await User.findById(assignedTo);
    if (!user || user.role !== "member") {
      return res.status(400).json({
        success: false,
        message: "Invalid Member ID",
      });
    }

    // Assign task
    task.assignedTo = assignedTo;
    // task.status = "Assigned";
    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task Assigned Successfully",
      task,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      errors: error.errors || error.message,
    });
  }
};
