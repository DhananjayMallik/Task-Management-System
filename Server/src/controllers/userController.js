// Here we write our user function like -> signUp , Login , getUser, updateUser and so on

/* User Functionality : Register a New User When Enter the website in the first time 
    1 : User Register first -> 
    2 : require the details(name , email , password , role) --> 
    3 : check user already exist or not --> 
    4 : if not -> create user -->
    5 : then show user registered successful-->
    6 : othewise->show user already exist 
    */
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { loginSchema, registerSchema } from '../validation/UserValidation.js'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
  try {
    //Validate user details for registration using Yup (only body)
    await registerSchema.validate({ body: req.body }, { abortEarly: false })

    const { name, email, password, role } = req.body

    // check if user exists
    const existUser = await User.findOne({ email })
    if (existUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10)

    // create user
    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
    })
    // successfully register
    return res.status(201).json({
      message: 'User Registered Successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res
        .status(404)
        .json(
          { success: false, message: 'validation error' },
          { error: error.message }
        )
    }

    return res
      .status(500)
      .json({ success: false, message: 'Server Error', error: error.message })
  }
}

// 📌 login functionality📌
/* 
    1. User wants to login.
    2. User sends email and password in request body.
    3. Backend verifies user exists.
    4. Backend checks password with bcrypt.
    5. If correct → backend generates JWT token.
    6. If token is generated → login successful.
    7. Token includes user role (admin/member).
    8. Based on role → redirect to Admin or Member page.
    9. If token is missing/invalid/expired → login denied.
    */
export const loginUser = async (req, res) => {
  try {
    await loginSchema.validate({ body: req.body }, { abortEarly: false })

    const { email, password } = req.body

    // find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      })
    }

    // check password
    const passwordMatched = await bcrypt.compare(password, user.password)
    if (!passwordMatched) {
      return res.status(403).json({
        success: false,
        message: 'Invalid password',
      })
    }

    // generate token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    )

    // 🎯 ROLE-BASED LOGIN RESPONSE
    if (user.role === 'admin') {
      return res.status(200).json({
        success: true,
        message: 'Welcome Admin',
        role: 'admin',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      })
    }

    if (user.role === 'member') {
      return res.status(200).json({
        success: true,
        message: 'Welcome Member',
        role: 'member',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    })
  }
}
/*📌
Update User : 
only Admin can update existing user details. 
step 1 : First fetch all the required details from body.
step 2 : Next we need an userId.
step 3 : Through Id we need to update the user details.
step 4 : Then check that user id is exist or not.
step 5 : if id exist.
step 6 : Then we should be update the user details.
step 6 : if ot exist.
step 7 : show error: user not found.
step 8 : otherwise server error.
📌 */
export const AdminUpdateUser = async (req, res) => {
  try {
    // first we need to find required details
    const userId = req.params.id
    const { name, email, password, role } = req.body
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { name, email, password, role },
      { new: true, runValidators: true }
    ).select('-password')
    if (!updateUser) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found',
      })
    }
    return res.status(200).json({
      success: true,
      message: 'User Update Successfully by admin',
      user: updateUser,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'server error!',
      error: error.message,
    })
  }
}

/*📌 Delete User : 
1. First Get userid
2. Then check user is exist or not
3. if exist then delete that user
4. if not exist show message user not found
5. return the response message 📌*/
export const deleteUser = async (req, res) => {
  try {
    // first request an id
    const userId = req.params.id
    // check user exist ot not
    if (!userId) {
      return res.status(403).json({
        success: false,
        message: 'User Not Found! please try again',
      })
    }
    // Check if user exists
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }
    // if user found
    await User.findByIdAndDelete(userId)
    return res.status(201).json({
      success: true,
      message: 'User Deleted Successfully',
    })
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Server error',
      error: error.message,
    })
  }
}
// Admin Can View All The User
// Any Member Can't View The user Details
export const ViewUser = async (req, res) => {
  try {
     // Check if user exists 
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User missing!",
      });
    }

    // Check role
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied: Only Admin Can View All Users!",
      });
    }
    const users = await User.find()
    return res.status(201).json({
      success: true,
      message: 'All User Fetched Successfully',
      users,
    })
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: 'Server Error',
    })
  }
}
