import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

// Correct usage:
// image = Background image
// logo = Your round logo
import bgImage from "../../assets/images/Home1.jpg";
import logo from "../../assets/images/landinglogo.jpg";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const navigate = useNavigate();

  // SEND OTP
  const handleSendOtp = async () => {
    if (!email) return alert("Enter email to send OTP");

    try {
      const res = await axiosInstance.post("https://task-management-system-6s4y.onrender.com/user/send-otp", { email });
      alert(res.data.message || "OTP Sent!");
      setOtpSent(true);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    try {
      const res = await axiosInstance.post("https://task-management-system-6s4y.onrender.com/user/verify-otp", { email, otp });
      alert(res.data.message || "OTP Verified!");
      setIsOtpVerified(true);
    } catch (error) {
      alert(error.response?.data?.message || "OTP Verification Failed");
    }
  };

  // REGISTER USER
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isOtpVerified) return alert("Please verify OTP first");

    if (!name || !email || !password || !role)
      return alert("All fields are required");

    try {
      await axiosInstance.post("https://task-management-system-6s4y.onrender.com/user/register", {
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
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* NAVBAR */}
      <header className="bg-white/90 backdrop-blur-md shadow px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Task Master Pro"
            className="w-12 h-12 object-cover rounded-full shadow"
          />
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
            Task Master Pro
          </h1>
        </Link>

        {/* BUTTONS */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-4 py-2 text-gray-700 font-semibold hover:text-green-600 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow transition"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* CENTER FORM */}
      <div className="flex justify-center items-center flex-grow px-4">
        <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/30">
          <h2 className="text-center text-white text-3xl font-bold mb-6 drop-shadow-md">
            Register New User
          </h2>

          <form onSubmit={handleSignup} className="space-y-4">

            {/* NAME */}
            <input
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white/70"
            />

            {/* EMAIL + SEND OTP */}
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
                className="px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Send OTP
              </button>
            </div>

            {/* OTP FIELD */}
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
                  className="px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Verify
                </button>
              </div>
            )}

            {/* VERIFIED MESSAGE */}
            {isOtpVerified && (
              <p className="text-green-700 font-semibold text-center">
                ✅ Email Verified Successfully!
              </p>
            )}

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white/70"
            />

            {/* ROLE */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white/70"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>

            {/* SIGN UP BUTTON */}
            <button
              type="submit"
              disabled={!isOtpVerified}
              className={`w-full py-2 rounded-lg text-lg font-semibold transition shadow-md ${
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
            <Link
              to="/login"
              className="text-yellow-300 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;