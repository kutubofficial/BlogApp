import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiArrowLeft } from "react-icons/fi";
import { MdOutlineSave } from "react-icons/md";
import BASE_URL, { AxiosInstance } from "../../config/api";

const EditBlog = () => {
  const { id } = useParams();
  const [editBlog, setEditBlog] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlog() {
      try {
        // const { data } = await axios.get(
        //   `${BASE_URL}/v1/blogs/fetch-one/${id}`
        // );
        const { data } = await AxiosInstance.get(`/blogs/fetch-one/${id}`);
        if (data.success && data.singleBlog) {
          setEditBlog({
            title: data.singleBlog.title,
            content: data.singleBlog.content,
          });
        } else {
          throw new Error(data.message || "Failed to fetch blog");
        }
      } catch (error) {
        console.error("Error fetching blog for edit:", error);
        toast.error(error.response?.data?.message || "Failed to load blog");
        navigate("/");
      }
    }

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isAuthenticated) {
      toast.warn("Please login to edit blog.");
      return navigate("/login");
    }

    if (!editBlog.title.trim() || editBlog.content.trim().length < 10) {
      toast.error("Valid title and minimum 10 characters of content required.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.patch(
        `${BASE_URL}/v1/blogs/update/${id}`,
        editBlog,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Blog updated successfully!");
        navigate(`/blog/${id}?updated=${Date.now()}`);
      } else {
        throw new Error(data.message || "Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error(error.response?.data?.message || "Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8 border border-gray-100">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-pink-600 hover:text-pink-800 mb-6 transition-colors duration-200 font-medium"
      >
        <FiArrowLeft className="mr-2" />
        Back to Blog
      </button>

      <h2 className="text-xl font-semibold text-pink-900 mb-4 flex items-center gap-2">
        <MdOutlineSave className="text-pink-600" />
        Edit Your Blog
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="title"
            value={editBlog.title}
            onChange={handleChange}
            placeholder="Edit blog title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            required
          />
        </div>
        <div>
          <textarea
            name="content"
            value={editBlog.content}
            onChange={handleChange}
            placeholder="Edit your content here (minimum 10 characters)..."
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
          {loading ? (
            "Updating..."
          ) : (
            <>
              <MdOutlineSave className="text-lg" />
              Update Blog
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
