// Here we define our user model --> user information 
import mongoose from "mongoose";
import { string } from "yup";
// Creating a schema to define how user data will be stored
const userSchema = new mongoose.Schema({
    // user ful name
    name: {
        type: string,
        required: true,
        trim: true
    },
    // user email information
    email: {
        type: string,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    // user password
    password: {
        type: string,
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