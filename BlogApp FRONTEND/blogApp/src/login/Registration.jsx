import React, { useState } from "react";
import { FaUserAlt, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL from "../config/api";

const Registration = () => {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(signupData);
    try {
      axios.post(`${BASE_URL}/v1/users/register`, signupData);
      toast.success("User registered successfully");
      navigate("/login");
    } catch (error) {
      console.log("REGISTER CATCH BLOCK ERROR: ", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-pink-100 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          ✍️ Join Our Blog
        </h1>
        <p className="text-center text-sm text-gray-500 mb-8">
          Sign up to write, explore, and share your stories.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="username"
              value={signupData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              value={signupData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-md transition duration-300"
          >
            Create Account
          </button>

          <p className="text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-pink-600 underline cursor-pointer">
                Login
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
