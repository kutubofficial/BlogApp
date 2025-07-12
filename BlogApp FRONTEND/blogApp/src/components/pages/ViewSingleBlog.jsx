import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import BASE_URL, { AxiosInstance } from "../../config/api";

const ViewSingleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      // const { data } = await axios.get(`${BASE_URL}/v1/blogs/fetch-one/${id}`);
      const { data } = await AxiosInstance.get(`/blogs/fetch-one/${id}`);
      console.log("data from single blog", data);
      if (data.success && data.singleBlog) {
        setBlog(data.singleBlog);
      } else {
        throw new Error(data.message || "Blog not found");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast.error(error.response?.data?.message || error.message);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const { data } = await axios.delete(`${BASE_URL}/v1/blogs/delete/${id}`, {
        withCredentials: true,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const formatDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (loading) return <div className="max-w-4xl mx-auto p-4">Loading...</div>;
  if (!blog) return <div className="max-w-4xl mx-auto p-4">Blog not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-pink-800 cursor-pointer hover:text-pink-600 mb-6 transition"
      >
        <FiArrowLeft className="mr-2" />
        Back
      </button>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <span className="text-sm text-gray-500">
          {formatDate(blog.createdAt)}
        </span>
        <h1 className="text-2xl font-semibold text-pink-600 mt-1 mb-4">
          {blog.title}
        </h1>
        <div className="prose max-w-none text-gray-700 mb-6">
          {blog.content}
          <p className="text-sm text-gray-500 mt-1">
            Created by: {blog.createdBy?.username || "Unknown"}
          </p>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={() => {
              navigate(`/edit/${id}`);
            }}
            className="px-4 py-2 border cursor-pointer border-gray-300 rounded hover:bg-gray-100 transition"
          >
            <CiEdit className="inline-block mb-1" /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 border cursor-pointer border-gray-300 rounded hover:bg-red-100 transition text-red-500"
          >
            <MdDeleteOutline className="inline-block mb-1" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewSingleBlog;
