// here we generate our otp for every time when a new user register
// otp will sending to your mail account
// here we fetch our mail id and store our otp into DB

/*
Here the step otp verification/generator or send otp into your mail
1   First Fetch the email
2	Generate OTP using otp-generator
3	Store OTP in MongoDB with expiration time
4	Send OTP via email using Nodemailer --> because of that we will send otp via email that's why we need nodemailer
5	Verify OTP later (check email + OTP match and not expired)
*/
import otpGenerator from "otp-generator";
import mailSender from "../utilies/mailSender.js";

// Store verified emails
export const verifiedEmails = new Set();

// Temporary OTP storage
const otpStore = new Map();


// ==========================================
// SEND OTP
// ==========================================

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    console.log("Sending OTP to:", email);

    // Generate 6 digit OTP
    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    console.log("Generated OTP:", otp);

    // Save OTP temporarily
    otpStore.set(email, {
      otp: otp,
      createdAt: Date.now(),
    });

    // Send OTP through Resend
    await mailSender(email, otp);

    console.log("OTP sent successfully to:", email);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error("SEND OTP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message,
    });
  }
};


// ==========================================
// VERIFY OTP
// ==========================================

export const verifyotp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    console.log("Verifying OTP for:", email);

    const storedOTP = otpStore.get(email);

    if (!storedOTP) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or expired",
      });
    }

    // OTP expires after 5 minutes
    const expirationTime = 5 * 60 * 1000;

    if (Date.now() - storedOTP.createdAt > expirationTime) {
      otpStore.delete(email);

      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // Check OTP
    if (storedOTP.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // OTP verified
    verifiedEmails.add(email);

    // Delete OTP after successful verification
    otpStore.delete(email);

    console.log("OTP verified successfully:", email);

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });

  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "OTP verification failed",
      error: error.message,
    });
  }
};