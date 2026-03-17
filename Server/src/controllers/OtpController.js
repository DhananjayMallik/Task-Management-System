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
import OTP from '../models/Otp.js'
import otpGenerator from 'otp-generator'
import mailSender from '../utilies/mailSender.js'
// logic for sending otp into my email
export const sendOtp = async (req, res) => {
  try {
    // 1. fetch email -->
    const { email } = req.body
    // validation email is exist or not
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      })
    }
    // remove old OTP
    await OTP.deleteMany({ email })
    // 2. generate otp through otpGenerator -->
    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })

    // 3. save that generating otp into my dataBase -->
    const otpBody = await OTP.create({ email, otp })

    // 4. send that otp via mail id -->
    const mailResponse = await mailSender(
      email, // in which mail id i will send the otp
      'Verification Email',
      `<h3>Confirm Email</h3>
       <p>Your OTP is: <b>${otp}</b></p>`
    )
    console.log(`Mail Response : ${mailResponse.response}`)
    // 5. response
    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
    })
  } catch (error) {
    console.log('OTP Error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
    })
  }
}

// verify that otp during login or sign up --> 
const verifiedEmails = new Set(); // store verified emails

export const verifyotp = async (req, res) => {
  try {
    // fetch otp with email ->
    const { email, otp } = req.body;

    // 1. Check OTP exists
    const otpRecord = await OTP.findOne({ email });

    if (!otpRecord) {
      return res.status(401).json({
        success: false,
        message: "OTP not found or expired",
      });
    }

    // 2. Validate OTP --> 
    if (otpRecord.otp !== otp) {
      return res.status(402).json({
        success: false,
        message: "Invalid OTP. Please try again",
      });
    }

    // 3. Mark email as verified
    verifiedEmails.add(email);

    // 4. Delete OTP from database
    // await OTP.deleteOne({ email });

    // return response after validate -->
    return res.status(200).json({
      success: true,
      message: "OTP Verified Successfully",
    });

  } catch (error) {
    console.log("OTP Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
    });
  }
};

export { verifiedEmails };