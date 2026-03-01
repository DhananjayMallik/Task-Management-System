import Task from '../models/Task.js'
import {
  createTaskSchema,
  updateTaskSchema,
} from '../validation/TaskValidation.js'

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

    const { title, description, status, assignedTo } = req.body

    const task = new Task({
      title,
      description,
      status,
      assignedTo,
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

// get all the task that created by admin and assigned that member : only Admin Can Control it
export const getAllTasks = async (req, res) => {
  try {
    // get that admin details
    // populate : when you store relationship in DB you often store only the reference  of another document
    const tasks = await Task.find()
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
    res.json(tasks)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        errors: error.errors, // Return all validation messages
      })
    }
  }
}

// update task status Admin + Member
export const UpdateTaskStatus = async (req, res) => {
  try {
    // Validate updateTaskSchema
    await updateTaskSchema.validate(req.body, { abortEarly: false });

    // destructuring id from body through request
    const {id} = req.params;

    // Find Task
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task Not Found!",
      });
    }
  /* if loggedInUser is admin then only you can update anyone task otherwise you can update only your own task */
  const loggedInUserId = req.user._id.toString();
  const assignedUserId = task.assignedTo ? task.assignedTo.toString() : null;
     if(req.user.role !== 'Admin' && assignedUserId !==loggedInUserId){
      return res.status(401).json({
        success : false,
        message : "You cannot update any other task"
      });
     }
    // if loggedinUser is member  then only Update his own task status 
    task.status = req.body.status;
    await task.save();
    // return response after update status
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