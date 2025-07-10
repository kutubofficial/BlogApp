import React, { useState } from "react";
import AllBlogs from "./pages/AllBlogs";
import CreateBlog from "./pages/CreateBlog";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-yellow-50 bg-gray-50">
      <div className="max-w-4xl  mx-auto py-8 px-4">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-indigo-400">
              StoryForge
            </span>
          </h1>
          <p className="text-lg text-gray-500">
            Share your thoughts with the world
          </p>
        </div>

        <CreateBlog setBlogs={setBlogs} />
        <AllBlogs blogs={blogs} setBlogs={setBlogs} />
      </div>
    </div>
  );
};

export default Dashboard;