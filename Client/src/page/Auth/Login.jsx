import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import image from "../../assets/images/first.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("All fields are required");
      return;
    }
    try {
      const res = await axiosInstance.post("/login", {
        email,
        password,
      });
      // sent it to the authcontext hook to save token and role into localStorage
      loginUser(res.data.token, res.data.role);
      // role based login system
      if (res.data.role == "admin") navigate("/admin-dashboard");
      else navigate("/member-dashboard");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login Failed");
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
      Login
    </h2>

    <form onSubmit={handleLogin} className="space-y-4">
      
      {/* Email */}
      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg bg-white/70 focus:ring-2 focus:ring-blue-400 outline-none"
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg bg-white/70 focus:ring-2 focus:ring-blue-400 outline-none"
      />

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-md"
      >
        Login
      </button>
    </form>

    <p className="mt-4 text-center text-white drop-shadow-md">
      Don't have an account?{" "}
      <a href="/signup" className="text-yellow-300 font-semibold hover:underline">
        Sign Up
      </a>
    </p>

  </div>
</div>

  );
};

export default Login;
