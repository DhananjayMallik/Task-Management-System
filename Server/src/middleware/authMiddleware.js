// here we want to write jwt token validation 
import jwt from 'jsonwebtoken';

/*
 * Auth Middleware 
 * Verifies JWT token sent in Authorization header
 * If valid, adds user info to req.user
 * If invalid or expired, returns 401
 */
export const authMiddleware = (req,res,next) => {
     try {
         // Get token from Authorization header
      const authHeader = req.headers.authorization;
      if(!authHeader){
        return res.status(402).json({
            success : false,
            message : "Access denied ! token will not provided"
        })
      }
      // validate token
      const token = authHeader.split(" ")[1];
      if(!token){
        return res.status(402).json({
            success : false,
            message : "Access Denied ! Missing Token"
        })
      }
      // if token will have we need to verify that token and decode it and show user information(id,email,role)
      const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
      // attached user information
      req.user = decoded; // id , email , role
      next();
     } catch (error) {
        return res.status(403).json({
            success : false,
            message : "Invalid Token ! Token expires!",
            error : error.message
        })
     }
}