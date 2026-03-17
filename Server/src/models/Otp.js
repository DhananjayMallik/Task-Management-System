import mongoose from "mongoose";

// here we define our otp model 
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, "Please enter a valid email"],
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});
// create model
const OTP = mongoose.model("OTP", otpSchema);
export default OTP;