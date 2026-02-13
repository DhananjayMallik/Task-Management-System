import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import image from "../../assets/images/Home1.jpg";
const SignUp = () => {
  // here we list out all the information related to user Registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !role) {
      alert("All the Fields are required");
      return;
    }
    try {
      const res = await axiosInstance.post("/register", {
        name,
        email,
        password,
        role,
      });
      console.log(res);
      alert("Register Successfull🫂🫂");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Signup Failed");
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Glassmorphism Card */}
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
            className="w-full px-4 py-2 border rounded-lg bg-white/70 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-white/70 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-white/70 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Role */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-white/70 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </select>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-md"
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
