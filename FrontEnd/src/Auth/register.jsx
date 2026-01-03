import { FiBookOpen } from "react-icons/fi";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <main className="bg-gray-100 flex p-5 justify-center items-center h-screen">
      <section className="bg-white rounded-md p-5 w-full md:max-w-md md:p-7">
        <div className="flex gap-4 justify-center space-y-3">
          <FiBookOpen className="text-[#8B5CF6] w-8 h-8 " />
          <h2 className="text-2xl">Study Tracker</h2>
        </div>
        <p className="text-gray-700 text-center">Create your account</p>
        <form action="" className="space-y-5">
          <div>
            <label htmlFor="email">Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-[#8B5CF6]"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-[#8B5CF6]"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div className="relative flex ">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-[#8B5CF6]"
              />
              <span
                className="absolute right-5 top-3  h-7 w-7"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="confirm_password">Confirm Password</label>
            <div className="relative flex ">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="password"
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-[#8B5CF6]"
              />
              <span
                className="absolute right-5 top-3  h-7 w-7"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <button className="w-full rounded-md bg-indigo-600 text-white p-3 transition transform duration-300 hover:bg-indigo-700 hover:scale-105">
            Sign Up
          </button>

          <p className="text-center">
            Already have an account?
            <Link to="/login" className="text-indigo-600 font-bold ml-2">
              Log in
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register;
