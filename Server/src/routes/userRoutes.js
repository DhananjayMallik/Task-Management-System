import express from 'express';
import {registerUser,loginUser,AdminUpdateUser,deleteUser, ViewUser} from '../controllers/userController.js';
import {authMiddleware} from '../middleware/authMiddleware.js';
import{adminOnly} from '../middleware/adminMiddleware.js';
import { sendOtp, verifyotp } from '../controllers/OtpController.js'
const router = express.Router();
// Registration successfull after OTP verification
router.post('/register',registerUser);
router.post('/login',loginUser);
// login in user details through token verification 
router.get('/profileInfo',authMiddleware, (req,res)=>{
    res.json({
        success : true,
        message : "User Information Fetched Successfully🫂📌🫂",
        user : req.user // id , role , email
    });
});
// for admin access only 
router.get('/adminProfile' , authMiddleware , adminOnly , (req,res)=>{
    res.json({
        success : true,
        message : "Welcome to Our Admin Dashboard Panel",
        user : req.user
    });
});
// admin can only update the details of any user
router.put('/update-User/:id',authMiddleware , adminOnly , AdminUpdateUser);
// delete user here
router.delete('/delete/:id', authMiddleware, adminOnly, deleteUser);
// Only Admin Can view All the user
router.get("/all-users", authMiddleware, adminOnly, ViewUser);

router.post('/send-otp' , sendOtp); // for otp generate
// verify otp
router.post('/verify-otp',verifyotp);
export default router;