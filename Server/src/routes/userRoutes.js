import express from 'express';
import {registerUser,loginUser,AdminUpdateUser} from '../controllers/userController.js';
import {authMiddleware} from '../middleware/authMiddleware.js';
import{adminOnly} from '../middleware/adminMiddleware.js';

const router = express.Router();
// first register user schema validation then post the user details
router.post('/register',registerUser);
router.post('/login',loginUser);
// login in user details
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
export default router;