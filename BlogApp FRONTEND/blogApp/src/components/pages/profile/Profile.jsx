import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { AuthContext } from "../../AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { defaultAvatar, defaultBlogImage } from "../../../assets/avtar";
import BASE_URL from "../../../config/api";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/v1/users/profile/${id}`, {
        withCredentials: true,
      });
      setProfileData(data.user);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (e, type = "avatar") => {
    e.target.src = type === "avatar" ? defaultAvatar : defaultBlogImage;
    e.target.onerror = null;
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-pink-600 hover:text-pink-800 mb-6 transition-colors duration-200 font-medium"
      >
        <FiArrowLeft className="text-lg" />
        Back to Dashboard
      </button>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-24 w-24 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      ) : profileData ? (
        <>
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-8">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden">
                <img
                  src={profileData.avatar || defaultAvatar}
                  alt={profileData.username}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => handleImageError(e, "avatar")}
                />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-pink-200 transition-all duration-300 pointer-events-none"></div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {profileData.username}
              </h1>
              <p className="text-gray-600 mb-4">{profileData.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="bg-pink-50 px-4 py-2 rounded-lg">
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="font-medium text-pink-700">
                    {new Date(profileData.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-pink-50 px-4 py-2 rounded-lg">
                  <p className="text-sm text-gray-500">Blogs</p>
                  <p className="font-medium text-pink-700">
                    {profileData.blogs?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              My Blogs
            </h2>

            {!profileData.blogs || profileData.blogs.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">No blogs published yet.</p>
                <button
                  onClick={() => navigate("/create-blog")}
                  className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200"
                >
                  Create Your First Blog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profileData.blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                  >
                    {/* <div className="h-48 w-full relative overflow-hidden">
                      <img
                        src={blog.image || defaultBlogImage}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => handleImageError(e, "blog")}
                      />
                    </div> */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-pink-800 mb-2 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {blog.content}
                      </p>
                      <button
                        onClick={() => navigate(`/blog/${blog._id}`)}
                        className="text-pink-600 hover:text-pink-800 transition-colors duration-200"
                      >
                        {/* Read More → */}
                        <span className="text-blue-500 hover:text-blue-700 text-sm">
                          READ MORE
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Failed to load profile data.</p>
          <button
            onClick={fetchProfile}
            className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
