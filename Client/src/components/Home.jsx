import { Link, useNavigate } from "react-router-dom";
import image from "../assets/images/landinglogo.jpg";
import image1 from "../assets/images/hero.png";
import image3 from "../assets/images/heroban.png";
const Home = () => {
  const navigate = useNavigate();
  const handleclick = () => {
    navigate("/signup");
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header / Navbar */}
      <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        {/* Left: Logo + Title */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={image}
            alt="Task Master Pro"
            className="w-12 h-12 object-cover rounded-full shadow"
          />
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
            Task Master Pro
          </h1>
        </Link>

        {/* Right: Buttons */}
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
      {/* Hero Section */}
      <div className="flex items-start justify-between px-10 mt-10 gap-10">
        {/* LEFT SIDE — TEXT */}
        <div className="w-1/2">
          {/* TASK + Image */}
          <div className="flex items-center gap-6 ">
            <h2 className="text-5xl md:text-6xl font-light tracking-wide text-sky-500">
              TASK
            </h2>

            <div className="bg-sky-400 rounded-full px-6 py-3 flex items-center justify-center">
              <img
                src={image1}
                alt=""
                className="w-40 h-20 object-cover rounded-full"
              />
            </div>
          </div>

          {/* MANAGEMENT */}
          <h2 className="text-6xl md:text-7xl font-extralight tracking-wide text-gray-900 mt-6">
            MANAGEMENT
          </h2>

          {/* SOFTWARE + Image */}
          <div className="flex items-center gap-6 mt-4">
            <h2 className="text-6xl md:text-7xl font-extralight tracking-wide text-gray-900">
              SOFTWARE
            </h2>

            <div className="bg-sky-400 rounded-full px-6 py-3 flex items-center justify-center">
              <img
                src={image1}
                alt=""
                className="w-40 h-20 object-cover rounded-full"
              />
            </div>
          </div>
          <p className="mt-3 text-xl font-light">
        Organize and manage your team like a boss with Task Master, task management software packing more capabilities than you can imagine. 
      </p>
      <button onClick={handleclick}
       className="bg-blue-500 py-4 px-10 text-xl  mt-4 text-white rounded-full hover:bg-blue-600 cursor-pointer">Get Started</button>
        </div>

        {/* RIGHT SIDE — IMAGE */}
        <div className="w-1/2 flex justify-center mt-5">
          <img src={image3} alt="" className="w-full max-w-lg object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Home;
