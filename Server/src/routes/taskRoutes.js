import express from "express";
import { CreateTask ,GetMyTasks, UpdateTaskStatus, deleteTaskOnlyAdmin, getAllTasks,AssignedTaskOnlyAdmin,UpdateTaskDetails} from "../controllers/TaskController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();


// Admin → Create task
router.post("/createTask", authMiddleware ,adminOnly, CreateTask);
// Member → Get his own Assigned Tasks tasks
router.get('/getMyTask' , authMiddleware , GetMyTasks);
// only admin manage all the tasks
router.get("/getAllTasks" , authMiddleware , adminOnly, getAllTasks);
// update status -> member
router.put('/updateStatus/:id',authMiddleware , UpdateTaskStatus);
// only admin can delete the existing task
router.delete("/deleteTask/:id",authMiddleware,adminOnly,deleteTaskOnlyAdmin);
// Admin → Assign the Task to member
router.put("/assign/:id", authMiddleware, AssignedTaskOnlyAdmin);
// Update Task Details --> Only Admin
router.put("/updateTaskDetails/:id" , authMiddleware , adminOnly,UpdateTaskDetails);
export default router;