import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

console.log(
  "RESEND KEY EXISTS:",
  !!process.env.RESEND_API_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

const mailSender = async (email, otp) => {
  try {
    console.log("Sending OTP to:", email);

    const { data, error } = await resend.emails.send({
       from: "Task Management System <onboarding@resend.dev>",
      to: [email],
      subject: "Your OTP Verification Code",
      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 500px;
          margin: auto;
          padding: 30px;
          border: 1px solid #ddd;
          border-radius: 10px;
        ">
          <h2>OTP Verification</h2>

          <p>Your verification OTP is:</p>

          <h1 style="
            letter-spacing: 8px;
            text-align: center;
          ">
            ${otp}
          </h1>

          <p>This OTP is valid for a limited time.</p>

          <p>If you did not request this OTP, please ignore this email.</p>
        </div>
      `,
    });

    if (error) {
      console.error("========== RESEND ERROR ==========");
      console.error(error);
      console.error("==================================");

      throw new Error(error.message || "Resend email failed");
    }

    console.log("OTP email sent successfully:", data);

    return data;

  } catch (error) {
    console.error("========== MAIL SENDER ERROR ==========");
    console.error(error);
    console.error("=======================================");

    throw error;
  }
};

export default mailSender;