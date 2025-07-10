import expressAsyncHandler from "express-async-handler";
import Blog from "../models/blog.model.js";
import { ErrorHandler } from "../utils/errorHandler.utils.js";
import User from "../models/user.model.js";

export const addBlog = expressAsyncHandler(async (req, res) => {
  // console.log(req.user); //this use for the user reference
  // console.log(req.user._id);
  const { title, content } = req.body;
  const NewBlog = await Blog.create({
    title,
    content,
    createdBy: req.user._id,
  });
  //~ increase the total blogs section
  // await User.updateOne({ _id: req.user._id }, { $inc: { totalBlogs: 1 } });

  //& add blog reference to the loggedIn user who create the blog
  await User.findByIdAndUpdate(
    { _id: req.user._id },
    { $push: { blogs: NewBlog._id } }
  );
  console.log(NewBlog);
  res.status(201).json({
    success: true,
    message: "blog created successfully",
    data: NewBlog,
  });
});
export const fetchAllBlog = expressAsyncHandler(async (req, res, next) => {
  // let allBlogs = await Blog.find();
  const allBlogs = await Blog.find()
    .populate("createdBy", "username email")
    .sort({ createdAt: -1 });

  if (allBlogs.length === 0)
    return next(new ErrorHandler("No Blog Found.!", 404));
  res.status(200).json({
    success: true,
    totalBlogs: allBlogs.length,
    message: "all blogs fetched successfully",
    allBlogs,
  });
});
export const fetchOneBlog = expressAsyncHandler(async (req, res, next) => {
  let singleBlog = await Blog.findById(req.params.id).populate("createdBy");
  if (!singleBlog) return next(new ErrorHandler("No Blog Found.!", 404));
  //*OR  if (!singleBlog) throw new ErrorHandler("Blog not found.!");
  res
    .status(200)
    .json({ success: true, message: "single blog fetched", singleBlog });
});
export const updateBlog = expressAsyncHandler(async (req, res, next) => {
  const currentUserId = req.user._id;
  const { title, content } = req.body;

  // console.log("Updating:", { title, content });

  const updatedBlog = await Blog.findOneAndUpdate(
    { _id: req.params.id, createdBy: currentUserId },
    { title, content },
    { new: true, runValidators: true }
  );

  if (!updatedBlog) return next("Blog not found or unauthorized", 404);

  console.log("Updated blog:", updatedBlog);

  res.status(200).json({
    success: true,
    message: "Blog updated successfully",
    updatedBlog,
  });
});

export const deleteBlog = expressAsyncHandler(async (req, res, next) => {
  const currentUserId = req.user._id;

  const blog = await Blog.findOne({
    _id: req.params.id,
    createdBy: currentUserId,
  });

  //* If blog is not found or doesn't belong to the user
  if (!blog) {
    return next(
      new ErrorHandler(
        "You are not authorized to delete this blog or blog does not exist.",
        403
      )
    );
  }

  const deletedBlog = await Blog.findByIdAndDelete(blog._id);

  await User.findByIdAndUpdate(currentUserId, {
    $pull: { blogs: blog._id },
    $inc: { totalBlogs: -1 },
  });

  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
    deletedBlog,
  });
});
