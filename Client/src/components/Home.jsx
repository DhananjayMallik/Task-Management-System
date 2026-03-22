import { Link, useNavigate } from "react-router-dom";
import image from "../assets/images/landinglogo.jpg";
import image1 from "../assets/images/hero.png";
import image3 from "../assets/images/heroban.png";
import image4 from "../assets/images/mediacontent.png";
import image5 from "../assets/images/register.png";
import image6 from '../assets/images/login.png'
const Home = () => {
  const navigate = useNavigate();

  const handleclick = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* NAVBAR */}
      <header className="bg-white shadow-md px-4 md:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={image}
            alt="Task Master Pro"
            className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full shadow"
          />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-wide">
            Task Master Pro
          </h1>
        </Link>

        <div className="flex items-center gap-3 md:gap-4">
          <Link
            to="/login"
            className="px-3 md:px-4 py-2 text-gray-700 font-semibold hover:text-green-600 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-4 md:px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow transition"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 mt-10 gap-10 mb-14">
        {/* LEFT SECTION — TEXT */}
        <div className="w-full md:w-1/2">
          {/* TASK + ICON */}
          <div className="flex items-center gap-4 md:gap-6">
            <h2 className="text-4xl md:text-6xl font-light tracking-wide text-sky-500">
              TASK
            </h2>

            <div className="bg-sky-400 rounded-full px-4 md:px-6 py-2 md:py-3 flex items-center justify-center">
              <img
                src={image1}
                alt=""
                className="w-20 h-10 md:w-40 md:h-20 object-cover rounded-full"
              />
            </div>
          </div>

          {/* MANAGEMENT */}
          <h2 className="text-5xl md:text-7xl font-extralight tracking-wide text-gray-900 mt-5">
            MANAGEMENT
          </h2>

          {/* SOFTWARE + ICON */}
          <div className="flex items-center gap-4 md:gap-6 mt-4">
            <h2 className="text-5xl md:text-7xl font-extralight tracking-wide text-gray-900">
              SOFTWARE
            </h2>

            <div className="bg-sky-400 rounded-full px-4 md:px-6 py-2 md:py-3 flex items-center justify-center">
              <img
                src={image1}
                alt=""
                className="w-20 h-10 md:w-40 md:h-20 object-cover rounded-full"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="mt-4 md:mt-6 text-lg md:text-xl font-light text-gray-700">
            Organize and manage your team like a boss with Task Master —
            powerful task management with everything you need.
          </p>

          {/* CTA BUTTON */}
          <button
            onClick={handleclick}
            className="bg-blue-500 py-3 md:py-4 px-8 md:px-10 text-lg md:text-xl mt-5 text-white rounded-full hover:bg-blue-600 transition"
          >
            Get Started
          </button>
        </div>

        {/* RIGHT SECTION — IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={image3}
            alt=""
            className="w-full max-w-md md:max-w-lg object-contain"
          />
        </div>
      </div>

      {/* BLUE LINE */}
      <div className="w-24 md:w-32 h-1 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></div>

      {/* WHY TASK MASTER SECTION */}
      <h3 className="text-center text-3xl md:text-4xl font-extralight">
        Why Task <span className="text-blue-500 font-semibold">Master</span>
      </h3>

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start mt-6 px-4 gap-8">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between mt-6 px-4 lg:px-16 gap-10">
          {/* LEFT IMAGE */}
          <div className="flex justify-center lg:justify-start w-full lg:w-1/2">
            <img
              src={image4}
              alt=""
              className="w-full max-w-sm md:max-w-lg object-contain lg:ml-10"
            />
          </div>

          {/* RIGHT TEXT + BUTTON */}
          <div className="w-full lg:w-1/2 text-center lg:text-left px-4">
            <p className="text-gray-700 text-lg leading-relaxed">
              When it comes down to choosing task management software, all you
              need is three things. Coincidentally, that’s exactly what you get
              from Bitrix24 — task management software that’s easy to use and
              features dozens of collaboration tools.
            </p>

            <button
              onClick={handleclick}
              className="bg-blue-500 py-3 md:py-4 px-8 md:px-10 text-lg md:text-xl mt-5 text-white rounded-full hover:bg-blue-600 transition cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div className="w-24 md:w-32 h-1 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 mt-20"></div>
      <h3 className="text-center text-3xl md:text-4xl font-extralight">
        Our Feature
      </h3>

      {/* Task Master Registration  */}
      {/* Section 1 */}
      <div className="flex flex-col lg:flex-row items-center justify-between mt-10 px-6 lg:px-16 gap-12">

        {/* LEFT IMAGE */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
          <img
            src={image5}
            alt=""
            className="max-w-xs sm:max-w-sm md:max-w-md object-contain rounded-xl"
          />
        </div>

        {/* RIGHT TEXT */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <p className="text-gray-700 text-lg leading-relaxed">
            When it comes down to choosing task management software, all you
            need is three things. Coincidentally, that’s exactly what you get
            from <span className="font-semibold text-blue-600">Task Master Pro</span> —
            task management software that’s easy to use and features dozens of
            collaboration tools.
          </p>

          <button
            onClick={handleclick}
            className="bg-blue-500 py-3 md:py-4 px-8 md:px-10 text-lg md:text-xl mt-6 text-white rounded-full hover:bg-blue-600 transition cursor-pointer mb-4"
          >
            Sign Up Free
          </button>
        </div>
      </div>


      {/* Section 2 — reversed layout */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between mt-16 px-6 lg:px-16 gap-12">

        {/* RIGHT TEXT */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <p className="text-gray-700 text-lg leading-relaxed">
            When it comes down to choosing task management software, all you
            need is three things. Coincidentally, that’s exactly what you get
            from <span className="font-semibold text-blue-600">Task Master Pro</span> —
            task management software that’s easy to use and features dozens of
            collaboration tools.
          </p>

          <button
            onClick={handleclick}
            className="bg-blue-500 py-3 md:py-4 px-8 md:px-10 text-lg md:text-xl mt-6 text-white rounded-full hover:bg-blue-600 transition cursor-pointer mb-4"
          >
            Connect With Us
          </button>
        </div>

        {/* IMAGE on the RIGHT */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <img
            src={image6}
            alt=""
            className="max-w-xs sm:max-w-sm md:max-w-md object-contain rounded-xl"
          />
        </div>
      </div>
      {/*Processing stage */}
      <div>
        
      </div>
    </div>
  );
};

export default Home;
