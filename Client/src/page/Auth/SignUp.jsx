// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axiosInstance from "../../api/axiosInstance";

// // Correct usage:
// // image = Background image
// // logo = Your round logo
// import bgImage from "../../assets/images/Home1.jpg";
// import logo from "../../assets/images/landinglogo.jpg";

// const SignUp = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");

//   const [otpSent, setOtpSent] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);

//   const navigate = useNavigate();

//   // SEND OTP
//   const handleSendOtp = async () => {
//     if (!email) return alert("Enter email to send OTP");

//     try {
//       const res = await axiosInstance.post("/user/send-otp", { email });
//       alert(res.data.message || "OTP Sent!");
//       setOtpSent(true);
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to send OTP");
//     }
//   };

//   // VERIFY OTP
//   const handleVerifyOtp = async () => {
//     try {
//       const res = await axiosInstance.post("/user/verify-otp", { email, otp });
//       alert(res.data.message || "OTP Verified!");
//       setIsOtpVerified(true);
//     } catch (error) {
//       alert(error.response?.data?.message || "OTP Verification Failed");
//     }
//   };

//   // REGISTER USER
//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (!isOtpVerified) return alert("Please verify OTP first");

//     if (!name || !email || !password || !role)
//       return alert("All fields are required");

//     try {
//       await axiosInstance.post("/user/register", {
//         name,
//         email,
//         password,
//         role,
//       });

//       alert("Registered Successfully!");
//       navigate("/login");
//     } catch (error) {
//       alert(error.response?.data?.message || "Registration Failed");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
//       style={{ backgroundImage: `url(${bgImage})` }}
//     >
//       {/* NAVBAR */}
//       <header className="bg-white/90 backdrop-blur-md shadow px-6 py-4 flex items-center justify-between">
//         {/* LOGO */}
//         <Link to="/" className="flex items-center gap-3">
//           <img
//             src={logo}
//             alt="Task Master Pro"
//             className="w-12 h-12 object-cover rounded-full shadow"
//           />
//           <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
//             Task Master Pro
//           </h1>
//         </Link>

//         {/* BUTTONS */}
//         <div className="flex items-center gap-4">
//           <Link
//             to="/login"
//             className="px-4 py-2 text-gray-700 font-semibold hover:text-green-600 transition"
//           >
//             Login
//           </Link>

//           <Link
//             to="/signup"
//             className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow transition"
//           >
//             Sign Up
//           </Link>
//         </div>
//       </header>

//       {/* CENTER FORM */}
//       <div className="flex justify-center items-center flex-grow px-4">
//         <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/30">
//           <h2 className="text-center text-white text-3xl font-bold mb-6 drop-shadow-md">
//             Register New User
//           </h2>

//           <form onSubmit={handleSignup} className="space-y-4">

//             {/* NAME */}
//             <input
//               type="text"
//               placeholder="Enter Full Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg bg-white/70"
//             />

//             {/* EMAIL + SEND OTP */}
//             <div className="flex gap-2">
//               <input
//                 type="email"
//                 placeholder="Enter Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg bg-white/70"
//               />

//               <button
//                 type="button"
//                 onClick={handleSendOtp}
//                 className="px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Send OTP
//               </button>
//             </div>

//             {/* OTP FIELD */}
//             {otpSent && !isOtpVerified && (
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   className="w-full px-4 py-2 border rounded-lg bg-white/70"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleVerifyOtp}
//                   className="px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                 >
//                   Verify
//                 </button>
//               </div>
//             )}

//             {/* VERIFIED MESSAGE */}
//             {isOtpVerified && (
//               <p className="text-green-700 font-semibold text-center">
//                 ✅ Email Verified Successfully!
//               </p>
//             )}

//             {/* PASSWORD */}
//             <input
//               type="password"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg bg-white/70"
//             />

//             {/* ROLE */}
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg bg-white/70"
//             >
//               <option value="">Select Role</option>
//               <option value="admin">Admin</option>
//               <option value="member">Member</option>
//             </select>

//             {/* SIGN UP BUTTON */}
//             <button
//               type="submit"
//               disabled={!isOtpVerified}
//               className={`w-full py-2 rounded-lg text-lg font-semibold transition shadow-md ${
//                 isOtpVerified
//                   ? "bg-blue-600 text-white hover:bg-blue-700"
//                   : "bg-gray-400 text-gray-300 cursor-not-allowed"
//               }`}
//             >
//               Sign Up
//             </button>
//           </form>

//           <p className="mt-4 text-center text-white drop-shadow-md">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="text-yellow-300 font-semibold hover:underline"
//             >
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
import { useState } from "react";
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

  const navigate = useNavigate();

  // ============================
  // SEND OTP
  // ============================
  const handleSendOtp = async () => {
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      alert("Please enter your email");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      alert("Please enter a valid email address");
      return;
    }

    if (sendingOtp) return;

    try {
      setSendingOtp(true);

      console.log("Sending OTP to:", cleanEmail);

      const res = await axiosInstance.post(
        "/user/send-otp",
        {
          email: cleanEmail,
        },
        {
          timeout: 20000,
        }
      );

      console.log("SEND OTP RESPONSE:", res.data);

      // Show OTP section
      setOtpSent(true);

      alert(res.data?.message || "OTP sent successfully! Check your email.");
    } catch (error) {
      console.error("SEND OTP ERROR:", error);

      if (error.code === "ECONNABORTED") {
        // Important:
        // OTP may already have been saved in database.
        setOtpSent(true);

        alert(
          "OTP request is taking too long. Please check your email. " +
          "If you receive the OTP, enter it below."
        );
      } else if (error.response) {
        console.error("STATUS:", error.response.status);
        console.error("DATA:", error.response.data);

        alert(
          error.response.data?.message ||
            "Failed to send OTP. Please try again."
        );
      } else if (error.request) {
        console.error("No response received from server");

        alert(
          "Server is taking too long to respond. Please check your email for OTP."
        );

        // Since your database shows OTP is being generated,
        // allow the user to enter it.
        setOtpSent(true);
      } else {
        alert("Failed to send OTP");
      }
    } finally {
      setSendingOtp(false);
    }
  };

  // ============================
  // VERIFY OTP
  // ============================
  const handleVerifyOtp = async () => {
    const cleanEmail = email.trim();
    const cleanOtp = otp.trim();

    if (!cleanOtp) {
      alert("Please enter OTP");
      return;
    }

    if (verifyingOtp) return;

    try {
      setVerifyingOtp(true);

      console.log("Verifying OTP:", cleanEmail, cleanOtp);

      const res = await axiosInstance.post(
        "/user/verify-otp",
        {
          email: cleanEmail,
          otp: cleanOtp,
        },
        {
          timeout: 15000,
        }
      );

      console.log("VERIFY OTP RESPONSE:", res.data);

      setIsOtpVerified(true);

      alert(res.data?.message || "OTP verified successfully!");
    } catch (error) {
      console.error("VERIFY OTP ERROR:", error);

      console.error("STATUS:", error.response?.status);
      console.error("DATA:", error.response?.data);

      alert(
        error.response?.data?.message ||
          "OTP verification failed. Please check the OTP."
      );
    } finally {
      setVerifyingOtp(false);
    }
  };

  // ============================
  // REGISTER USER
  // ============================
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    if (!isOtpVerified) {
      alert("Please verify OTP first");
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

    if (registering) return;

    try {
      setRegistering(true);

      console.log("Registering user...");

      const res = await axiosInstance.post(
        "/user/register",
        {
          name: name.trim(),
          email: email.trim(),
          password,
          role,
        },
        {
          timeout: 20000,
        }
      );

      console.log("REGISTER RESPONSE:", res.data);

      alert(res.data?.message || "Registered Successfully!");

      navigate("/login");
    } catch (error) {
      console.error("REGISTRATION ERROR:", error);

      console.error("STATUS:", error.response?.status);
      console.error("DATA:", error.response?.data);

      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
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
      <header className="bg-white/90 backdrop-blur-md shadow px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <img
            src={logo}
            alt="Task Master Pro"
            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full shadow"
          />

          <h1 className="text-lg sm:text-2xl font-bold text-gray-800 tracking-wide">
            Task Master Pro
          </h1>
        </Link>

        {/* BUTTONS */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/login"
            className="px-2 sm:px-4 py-2 text-gray-700 font-semibold hover:text-green-600 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-3 sm:px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow transition"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* CENTER FORM */}
      <div className="flex justify-center items-center flex-grow px-4 py-8">
        <div className="bg-white/20 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/30">
          <h2 className="text-center text-white text-2xl sm:text-3xl font-bold mb-6 drop-shadow-md">
            Register New User
          </h2>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* NAME */}
            <input
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white/70 outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* EMAIL + SEND OTP */}
            <div className="flex flex-col sm:flex-row gap-2">
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
                }}
                className="w-full px-4 py-2 border rounded-lg bg-white/70 outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                type="button"
                onClick={handleSendOtp}
                disabled={sendingOtp}
                className={`px-4 py-2 rounded-lg text-white font-semibold whitespace-nowrap transition ${
                  sendingOtp
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {sendingOtp ? "Sending..." : "Send OTP"}
              </button>
            </div>

            {/* OTP FIELD */}
            {otpSent && !isOtpVerified && (
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength="6"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, ""))
                  }
                  className="w-full px-4 py-2 border rounded-lg bg-white/70 outline-none focus:ring-2 focus:ring-green-400"
                />

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={verifyingOtp}
                  className={`px-4 py-2 rounded-lg text-white font-semibold whitespace-nowrap transition ${
                    verifyingOtp
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {verifyingOtp ? "Verifying..." : "Verify"}
                </button>
              </div>
            )}

            {/* VERIFIED MESSAGE */}
            {isOtpVerified && (
              <div className="bg-green-100 border border-green-400 rounded-lg p-3">
                <p className="text-green-700 font-semibold text-center">
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
              className="w-full px-4 py-2 border rounded-lg bg-white/70 outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* ROLE */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white/70 outline-none focus:ring-2 focus:ring-blue-400"
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
                isOtpVerified && !registering
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-300 cursor-not-allowed"
              }`}
            >
              {registering ? "Creating Account..." : "Sign Up"}
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