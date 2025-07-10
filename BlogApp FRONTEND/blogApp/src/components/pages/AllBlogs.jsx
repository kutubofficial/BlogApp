import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import BASE_URL from "../../config/api";

const AllBlogs = ({ blogs, setBlogs }) => {

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/v1/blogs/fetch-all`);
      if (data.success && data.allBlogs) {
        setBlogs(data.allBlogs);
      } else {
        throw new Error(data.message || "Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error(error.response?.data?.message || error.message);
      setBlogs([]);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

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
  console.log("All Blogs >>>", blogs);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Recent Blogs
      </h2>

      <div className="space-y-6">
        {blogs?.length > 0 ? (
          blogs?.map((blog) => (
            <div key={blog._id} className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-start mb-1">
                <span className="text-sm text-gray-500">
                  {formatDate(blog.createdAt)}
                </span>
              </div>
              <Link to={`/blog/${blog._id}`} className="block">
                <h3 className="text-xl font-medium text-pink-600 hover:text-pink-800 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 line-clamp-2 mb-3">
                  {blog.content}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Created by: {blog.createdBy?.username || "Unknown"}
                </p>
                <span className="text-blue-500 hover:text-blue-700 text-sm">
                  READ MORE
                </span>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-10">
            No blogs found. Create one above!
          </p>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
