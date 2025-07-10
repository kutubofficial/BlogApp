import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { TfiWrite } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";
import BASE_URL from "../../config/api";

const Navbar = () => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/v1/users/logout`,
        {},
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      setUser(null);
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-pink-900 ">
          <TfiWrite className="inline-block mb-1" /> BlogApp
        </Link>

        <div className="flex gap-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/register"
                className="text-pink-900 cursor-pointer hover:text-pink-600 transition"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-pink-900 cursor-pointer hover:text-pink-600 transition"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <button
                className="text-pink-900 cursor-pointer hover:text-pink-600 transition"
                onClick={() => navigate(`/profile/${user?._id}`)}
              >
                <CgProfile className="inline-block mb- text-2xl" />
              </button>
              <button
                onClick={handleLogout}
                className="text-pink-900 cursor-pointer hover:text-pink-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
