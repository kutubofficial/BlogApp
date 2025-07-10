import React, { useState, useContext } from "react";
import axios from "axios";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../components/AuthProvider";

const Login = () => {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const BASE_URL = "http://localhost:5000";

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/v1/users/login`, loginData, {
        withCredentials: true,
      });

      setIsAuthenticated(true);
      setUser(res.data.user);
      console.log(res.data.user);

      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      console.log("LOGIN CATCH BLOCK ERROR: ", error);
      toast.error("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-yellow-50 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          🔐 Welcome Back
        </h1>
        <p className="text-center text-sm text-gray-500 mb-8">
          Log in to continue writing and reading amazing stories.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="email"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-md transition duration-300"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <p className="text-sm text-gray-500 text-center">
            New here?{" "}
            <Link to="/register">
              <span className="text-pink-600 underline cursor-pointer">
                Create an account
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
