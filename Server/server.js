// import express from 'express';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import { dbConnection } from './src/config/db.js';
// import userRouter from './src/routes/userRoutes.js';
// import taskRouter from './src/routes/taskRoutes.js';
// import path from 'path';
// dotenv.config();
// const app = express();

// app.use(
//   cors({
//     origin: [
  
//       "http://localhost:5173",    // for local dev
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true, 
//   })
// );
// const dirName = path.resolve();
// app.use(express.json());

// // port
// const port = process.env.PORT || 5000;
// // database connection
// dbConnection()
// app.get('/', (req, res) => {
//   res.send('Task Management System Backend Running Here 🚀');
// })
// // all the useable routes for User
// app.use('/api/user', userRouter);
// // Task routes for useable task controller
// app.use("/api/task", taskRouter);
// app.use(express.static(path.join(dirName,"/Client/dist")));
// app.get('*',(req,res)=>{
//   res.sendFile(path.resolve(dirName,"Client","dist","index.html"));
// });
// app.listen(port, "0.0.0.0", () => {
//   console.log(`Server running at: ${port}`);
// });

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dbConnection } from "./src/config/db.js";
import userRouter from "./src/routes/userRoutes.js";
import taskRouter from "./src/routes/taskRoutes.js";
import path from "path";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

const dirName = path.resolve();

app.use(express.json());
app.use(cookieParser());

// Port
const port = process.env.PORT || 5000;

// Database connection
dbConnection();

// Home route
// app.get("/", (req, res) => {
//   res.send("Task Management System Backend Running Here 🚀");
// });

// User routes
app.use("/api/user", userRouter);

// Task routes
app.use("/api/task", taskRouter);

// React frontend
app.use(express.static(path.join(dirName, "Client", "dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(dirName, "Client", "dist", "index.html"));
});

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at: ${port}`);
});