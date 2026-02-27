import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ success: false, message: "Token missing" });

    const token = authHeader.split(" ")[1];
    if (!token)
      return res.status(401).json({ success: false, message: "No token provided" });

    // Decode JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Get actual user details from DB 
    //otherwisw you don't know which user will create that task or assign that task
    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(401).json({ success: false, message: "User not found" });

    req.user = user; // FULL user document (including _id)
    next();

  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message
    });
  }
};