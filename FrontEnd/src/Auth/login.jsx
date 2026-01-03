import { FiBookOpen } from "react-icons/fi";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginFn = useMutation({
    mutationFn: (data) => login(data),
    onSuccess: (response) => {
      if (response.ok) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    },
  });

  const handleChange = useCallback(
    (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData]
  );

  const submitLogin = useCallback(
    (e) => {
      e.preventDefault();
      loginFn.mutate(formData);
    },
    [formData]
  );
  return (
    <main className="bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-1000 flex p-5 justify-center items-center h-screen">
      <section className="bg-white rounded-lg shadow-lg p-5 w-full md:max-w-md md:p-7">
        <div className="space-y-2">
          <span className="bg-gradient-to-br flex justify-self-center from-indigo-600 to-purple-600 p-5 rounded-xl">
            <FiBookOpen className="text-white  w-8 h-8 " />
          </span>
          <h2 className="text-2xl text-center font-semibold">Study Tracker</h2>
          <p className="text-gray-500 text-center">
            Log in to track your study progress
          </p>
        </div>
        <form action="" className="space-y-5" onSubmit={submitLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-[#8B5CF6]"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div className="relative flex ">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
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
          <button className="w-full rounded-md bg-indigo-600 text-white p-3 transition transform duration-300 hover:bg-indigo-700 hover:scale-105">
            Login
          </button>

          <p className="text-center">
            Don't have an account?
            <Link to="/register" className="text-indigo-600 font-bold ml-2">
              Sign up
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;
