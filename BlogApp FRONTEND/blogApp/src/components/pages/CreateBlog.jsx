import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdOutlineCreate } from "react-icons/md";
import { MdCreate } from "react-icons/md";

const CreateBlog = ({ setBlogs }) => {
  const BASE_URL = "http://localhost:5000";
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.warn("Please login to create a blog.");
      return navigate("/login");
    }

    if (!newBlog.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (newBlog.content.trim().length < 10) {
      toast.error("Content must be at least 10 characters");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/v1/blogs/add`, newBlog, {
        withCredentials: true,
      });

      if (data.success && data.data) {
        toast.success("Blog created successfully");
        setNewBlog({ title: "", content: "" });
        setBlogs((prev) => [data.data, ...prev]);
      }
    } catch (err) {
      console.error("Error creating blog:", err);
      toast.error(err.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8 border border-gray-100">
      <h2 className="text-xl font-semibold text-pink-900 mb-4 flex items-center gap-2">
        <MdCreate className="text-pink-600" />
        Create New Blog
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleChange}
            placeholder="Blog title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            required
          />
        </div>
        <div>
          <textarea
            name="content"
            value={newBlog.content}
            onChange={handleChange}
            placeholder="Write your content here (minimum 10 characters)..."
            className="w-full p-3 border border-gray-300 rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-y min-h-[160px]"
            required
            minLength={10}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition-all duration-200 flex items-center justify-center gap-2 ${
            loading
              ? "opacity-80 cursor-not-allowed"
              : "hover:shadow-md hover:-translate-y-0.5"
          } shadow-md active:translate-y-0 active:shadow-sm`}
        >
          <MdOutlineCreate className="text-lg" />
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
