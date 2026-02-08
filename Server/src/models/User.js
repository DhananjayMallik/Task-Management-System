// Here we define our user model --> user information 
import mongoose from "mongoose";

// Creating a schema to define how user data will be stored
const userSchema = new mongoose.Schema({
    // user ful name
    name: {
        type: String,
        required: true,
        trim: true
    },
    // user email information
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    // user password
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    // user accessing role 
    role: {
        type: String,
        enum: ["admin", "member"],
        default: "member",
    },
},
    { timestamps: true }
);
// Exporting the model so it can be used in controllers/routes
export default mongoose.model('User', userSchema);