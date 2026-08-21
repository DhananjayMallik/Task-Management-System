import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import bgImage from "../../assets/images/Home1.jpg";
import logo from "../../assets/images/landinglogo.jpg";
import { Link } from "react-router-dom";

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
      const res = await axiosInstance.post("/user/login", { email, password });

      const { token, user } = res.data;
      loginUser(token, user.role, user);

      if (user.role === "admin") navigate("/admin-dashboard");
      else navigate("/member-dashboard");

    } catch (error) {
      console.log(error);
      navigate("/NotFound");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* NAVBAR */}
      <header className="bg-white/90 backdrop-blur-md shadow px-6 py-4 flex items-center justify-between">
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

      {/* CENTERED LOGIN CARD */}
      <div className="flex justify-center items-center flex-1 px-4">
        <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/30">
          
          <h2 className="text-center text-white text-3xl font-bold mb-6 drop-shadow-md">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white/70 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white/70 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-md"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-white drop-shadow-md">
            Don't have an account?{" "}
            <Link to="/signup" className="text-yellow-300 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;