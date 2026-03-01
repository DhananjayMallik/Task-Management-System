import express from "express";
import { CreateTask ,GetMyTasks, UpdateTaskStatus, getAllTasks} from "../controllers/TaskController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Admin can create task
router.post("/createTask", authMiddleware, adminOnly, CreateTask);
// only member
router.get('/getMyTask' , authMiddleware , GetMyTasks);
// only admin
router.get("/getAllTasks" , authMiddleware , adminOnly, getAllTasks);
// admin + member
router.put('/updateStatus/:id',authMiddleware , UpdateTaskStatus);
export default router;