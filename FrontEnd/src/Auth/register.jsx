import { FiBookOpen } from "react-icons/fi";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const handleChange = useCallback(
    (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData]
  );
  const registerFn = useMutation({
    mutationFn: (data) => register(data),
    onSuccess: (response) => {
      if (response.ok) {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.message);
      }
    },
  });

  const submitRegister = useCallback(
    (e) => {
      e.preventDefault();
      if (formData.password != formData.confirmpassword)
        return toast.error(`password dont match`);
      registerFn.mutate(formData);
    },
    [formData]
  );
  return (
    <main className="bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex p-5 justify-center items-center h-screen">
      <section className="bg-white rounded-lg p-5 shadow-lg  w-full md:max-w-md md:p-7">
        <div className="space-y-2">
          <span className="bg-gradient-to-br flex justify-self-center from-indigo-600 to-purple-600 p-5 rounded-xl">
            <FiBookOpen className="text-white  w-8 h-8 " />
          </span>
          <h2 className="text-2xl text-center font-semibold">Study Tracker</h2>
        </div>
        <p className="text-gray-700 text-center">
          Create your account to start tracking
        </p>
        <form action="" className="space-y-5" onSubmit={submitRegister}>
          <div>
            <label htmlFor="email">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-[#8B5CF6]"
            />
          </div>
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

          <div>
            <label htmlFor="confirm_password">Confirm Password</label>
            <div className="relative flex ">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmpassword"
                onChange={handleChange}
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
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 text-white p-3 transition transform duration-300 hover:bg-indigo-700 hover:scale-105"
          >
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
