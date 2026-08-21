import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

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

  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [registering, setRegistering] = useState(false);

  const [otpCooldown, setOtpCooldown] = useState(0);

  const navigate = useNavigate();

  // OTP COOLDOWN TIMER
  useEffect(() => {
    if (otpCooldown <= 0) return;

    const timer = setInterval(() => {
      setOtpCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [otpCooldown]);

  // SEND OTP
  const handleSendOtp = async () => {
    if (!email.trim()) {
      alert("Please enter your email first");
      return;
    }

    if (sendingOtp || otpCooldown > 0) {
      return;
    }

    setSendingOtp(true);

    try {
      const res = await axiosInstance.post("/user/send-otp", {
        email: email.trim(),
      });

      alert(res.data.message || "OTP sent successfully!");

      setOtpSent(true);
      setIsOtpVerified(false);
      setOtp("");

      // 30 second resend cooldown
      setOtpCooldown(30);
    } catch (error) {
      console.error("Send OTP Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to send OTP. Please try again."
      );
    } finally {
      setSendingOtp(false);
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    if (!otp.trim()) {
      alert("Please enter OTP");
      return;
    }

    if (verifyingOtp) {
      return;
    }

    setVerifyingOtp(true);

    try {
      const res = await axiosInstance.post("/user/verify-otp", {
        email: email.trim(),
        otp: otp.trim(),
      });

      alert(res.data.message || "OTP verified successfully!");

      setIsOtpVerified(true);
    } catch (error) {
      console.error("OTP Verification Error:", error);

      alert(
        error.response?.data?.message ||
          "OTP verification failed. Please check your OTP."
      );
    } finally {
      setVerifyingOtp(false);
    }
  };

  // REGISTER USER
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your full name");
      return;
    }

    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    if (!isOtpVerified) {
      alert("Please verify your email with OTP first");
      return;
    }

    if (!password) {
      alert("Please enter your password");
      return;
    }

    if (!role) {
      alert("Please select a role");
      return;
    }

    if (registering) {
      return;
    }

    setRegistering(true);

    try {
      // IMPORTANT:
      // axiosInstance already contains your backend URL + /api
      await axiosInstance.post("/user/register", {
        name: name.trim(),
        email: email.trim(),
        password,
        role,
      });

      alert("Registered Successfully!");

      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error);

      alert(
        error.response?.data?.message ||
          "Registration Failed. Please try again."
      );
    } finally {
      setRegistering(false);
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

        {/* NAVIGATION BUTTONS */}
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
      <div className="flex justify-center items-center flex-grow px-4 py-8">
        <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/30">
          {/* TITLE */}
          <h2 className="text-center text-white text-3xl font-bold mb-6 drop-shadow-md">
            Register New User
          </h2>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* NAME */}
            <div>
              <input
                type="text"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-white/70 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* EMAIL + SEND OTP */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  // Reset OTP verification if email changes
                  setOtpSent(false);
                  setIsOtpVerified(false);
                  setOtp("");
                  setOtpCooldown(0);
                }}
                className="w-full px-4 py-2 border rounded-lg bg-white/70 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={handleSendOtp}
                disabled={sendingOtp || otpCooldown > 0}
                className={`px-4 rounded-lg text-white font-medium min-w-[110px] transition ${
                  sendingOtp || otpCooldown > 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {sendingOtp
                  ? "Sending..."
                  : otpCooldown > 0
                  ? `Resend ${otpCooldown}s`
                  : otpSent
                  ? "Resend OTP"
                  : "Send OTP"}
              </button>
            </div>

            {/* OTP FIELD */}
            {otpSent && !isOtpVerified && (
              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setOtp(value);
                  }}
                  className="w-full px-4 py-2 border rounded-lg bg-white/70 outline-none focus:ring-2 focus:ring-green-500 tracking-widest"
                />

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={verifyingOtp}
                  className={`px-4 rounded-lg text-white font-medium min-w-[90px] transition ${
                    verifyingOtp
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {verifyingOtp ? "Verifying..." : "Verify"}
                </button>
              </div>
            )}

            {/* VERIFIED MESSAGE */}
            {isOtpVerified && (
              <div className="bg-green-100 border border-green-400 rounded-lg p-3 text-center">
                <p className="text-green-700 font-semibold">
                  ✅ Email Verified Successfully!
                </p>
              </div>
            )}

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white/70 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* ROLE */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white/70 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>

            {/* SIGN UP BUTTON */}
            <button
              type="submit"
              disabled={!isOtpVerified || registering}
              className={`w-full py-2 rounded-lg text-lg font-semibold transition shadow-md ${
                !isOtpVerified || registering
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {registering ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          {/* LOGIN LINK */}
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