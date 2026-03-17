import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { dbConnection } from './src/config/db.js';
import userRouter from './src/routes/userRoutes.js';
import taskRouter from './src/routes/taskRoutes.js';
dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-management-system-dh2x-5yxfziard-dhonu-malliks-projects.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// port
const port = process.env.PORT || 5000;
// database connection
dbConnection()
app.get('/', (req, res) => {
  res.send('Task Management System Backend Running Here 🚀');
})
// all the useable routes for User
app.use('/api/user', userRouter);
// Task routes for useable task controller
app.use("/api/task", taskRouter);
app.listen(port, () => {
  console.log(`server running at : ${port}`)
});
