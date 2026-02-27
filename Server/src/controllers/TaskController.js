import Task from '../models/Task.js'
import { createTaskSchema } from '../validation/TaskValidation.js'

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
