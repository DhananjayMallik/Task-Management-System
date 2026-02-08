// Here we write admin logic only admin can enter that dashboard
/*
 * Admin Middleware
 * Checks if the logged-in user has role 'admin'
 * Requires authMiddleware to run first
 */
export const adminOnly = (req,res,next) => {
    try {
          // req.user is set by authMiddleware
          if(!req.user){
            return req.status(402).json({
                success : false,
                message : "Unauthorized user informatio missing!"
            })
          }
          // check role
          if(req.user.role !== 'admin'){
            return res.status(402).json({
                success : false,
                message : "Access Denied You will not access admin panel"
            })
          }
          next();
    } catch (error) {
        return res.status(403).json({
            success : false,
            message : "Server error",
            error : error.message
        });
    }
}