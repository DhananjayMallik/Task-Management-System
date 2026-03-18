import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import image from "../../assets/images/Home1.jpg";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // for store otp 
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  // for sending otp
  const [otpSent, setOtpSent] = useState(false);
  // for verifying otp
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const navigate = useNavigate();

  // Handle our sending otp 
  const handleSendOtp = async () => {
    if (!email) {
      alert("Enter email to send OTP");
      return;
    }

    try {
      // send otp via mail
      const res = await axiosInstance.post("/user/send-otp", { email });
      alert(res.data.message || "OTP Sent!");
      setOtpSent(true);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    }
  };
// After Sending OTP We need to verify that otp
  const handleVerifyOtp = async () => {
    try {
      const res = await axiosInstance.post("/user/verify-otp", {
        email,
        otp,
      });

      alert(res.data.message || "OTP Verified!");
      setIsOtpVerified(true);
    } catch (error) {
      alert(error.response?.data?.message || "OTP Verification Failed");
    }
  };

  // For Registering new user 
  const handleSignup = async (e) => {
    e.preventDefault();
    // check otp verify or not
    if (!isOtpVerified) {
      alert("Please verify OTP before registering!");
      return;
    }

    if (!name || !email || !password || !role) {
      alert("All fields are required");
      return;
    }

    try {
      await axiosInstance.post("/user/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registered Successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/30">
        <h2 className="text-center text-white text-3xl font-bold mb-6 drop-shadow-md">
          Register New User
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-white/70"
          />

          {/* Email */}
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white/70"
            />

            <button
              type="button"
              onClick={handleSendOtp}
              className="px-4 bg-blue-600 text-white rounded-lg"
            >
              Send OTP
            </button>
          </div>

          {/* OTP Field - Shown ONLY when OTP sent AND not verified */}
          {otpSent && !isOtpVerified && (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-white/70"
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="px-4 bg-green-600 text-white rounded-lg"
              >
                Verify
              </button>
            </div>
          )}

          {/* OTP Verified Message */}
          {isOtpVerified && (
            <p className="text-green-700 font-semibold text-center">
              ✅ Email Verified Successfully!
            </p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-white/70"
          />

          {/* Role */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-white/70"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </select>

          {/* Register Button */}
          <button
            type="submit"
            disabled={!isOtpVerified}
            className={`w-full py-2 rounded-lg text-lg font-semibold transition shadow-md
              ${
                isOtpVerified
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-300 cursor-not-allowed"
              }`}
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-white drop-shadow-md">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-yellow-300 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;