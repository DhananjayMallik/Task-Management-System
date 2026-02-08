import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { dbConnection } from './src/config/db.js';
import userRouter from './src/routes/userRoutes.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// port
const port = process.env.PORT || 5000;
// database connection
dbConnection();
app.get('/' , (req,res)=>{
    res.send("TaskMaster Pro Backend Running 🚀");
});
// all the useable routes
app.use('/api/user', userRouter);

app.listen(port , ()=>{
    console.log(`server running at : ${port}`);
})