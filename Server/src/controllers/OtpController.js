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
import OTP from "../models/Otp.js";
import otpGenerator from "otp-generator";
import mailSender from "../utilies/mailSender.js";

// Store verified emails
const verifiedEmails = new Set();

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

    const cleanEmail = email.trim().toLowerCase();

    // Remove previous OTP
    await OTP.deleteMany({ email: cleanEmail });

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Save OTP
    await OTP.create({
      email: cleanEmail,
      otp,
    });

    console.log("================================");
    console.log("OTP CREATED");
    console.log("Email:", cleanEmail);
    console.log("OTP:", otp);
    console.log("================================");

    // Send email
    try {
      const mailResponse = await mailSender(
        cleanEmail,
        "Verification Email",
        `
          <div style="font-family: Arial, sans-serif;">
            <h2>Task Master Pro - Email Verification</h2>
            <p>Your OTP is:</p>
            <h1>${otp}</h1>
            <p>This OTP is valid for verification.</p>
          </div>
        `
      );

      console.log("EMAIL SENT SUCCESSFULLY");
      console.log("Mail Response:", mailResponse?.response);

    } catch (mailError) {
      console.error("EMAIL SENDING ERROR:", mailError);

      // OTP is already in database.
      // Tell frontend that email sending failed.
      return res.status(500).json({
        success: false,
        message:
          "OTP generated but email could not be sent. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully. Please check your email.",
    });

  } catch (error) {
    console.error("OTP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
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

    const cleanEmail = email.trim().toLowerCase();

    // Find OTP
    const otpRecord = await OTP.findOne({
      email: cleanEmail,
    });

    if (!otpRecord) {
      return res.status(404).json({
        success: false,
        message: "OTP not found or expired",
      });
    }

    // Compare OTP
    if (otpRecord.otp !== otp.trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again",
      });
    }

    // Mark verified
    verifiedEmails.add(cleanEmail);

    // Delete OTP after successful verification
    await OTP.deleteOne({
      _id: otpRecord._id,
    });

    console.log("OTP VERIFIED:", cleanEmail);

    return res.status(200).json({
      success: true,
      message: "OTP Verified Successfully",
    });

  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
    });
  }
};

export { verifiedEmails };