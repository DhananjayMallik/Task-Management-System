import express from "express";
import { CreateTask ,GetMyTasks} from "../controllers/TaskController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Admin can create task
router.post("/createTask", authMiddleware, adminOnly, CreateTask);
router.get('/getMyTask' , authMiddleware , GetMyTasks);
export default router;