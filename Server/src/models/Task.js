// ---------------------------------------------------------------
// 📝 Task Model - Stores all task-related information in MongoDB
// ---------------------------------------------------------------
import mongoose from 'mongoose'

// Creating a schema to define how tasks data will be stored
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: string,
      required: true,
      trim: true,
    },
    description: {
      type: string,
      required: true,
      trim: true,
    },
    status: {
      type: string,
      enum: ['pending', 'in-progress', 'completed'], // allowed values
      default: 'pending', // by default values assigned
    },
    // User assigned to this task
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User model
    },
    // User who created this task
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User model
    },
  },
  { timestamps: true }
)
// Exporting the model for used in controllers and routes
export default mongoose.model('Task', taskSchema)
