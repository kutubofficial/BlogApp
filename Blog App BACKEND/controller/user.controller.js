import User from "../models/user.model.js";
import expressAsyncHandler from "express-async-handler";
import { generateJWTToken } from "../utils/jwt.utils.js";
import { ErrorHandler } from "../utils/errorHandler.utils.js";
import mongoose from "mongoose";

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // const existingUser = await User.findOne({ email });
  // if (existingUser) {
  //   return res.status(400).json({ message: "User already exists" });
  // }
  const newUser = await User.create({
    username,
    email,
    password,
  });
  // console.log("NEW USER - ", newUser);
  res.status(201).json({
    success: true,
    message: "user registered successfully!",
    data: newUser,
  });
});

export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }
  const loginUser = await User.findOne({ email });
  if (!loginUser) throw new ErrorHandler("Invalid Credentials", 404);
  let isMatch = await loginUser.comparePassword(password);
  // console.log("Password Match: ", isMatch);
  if (!isMatch)
    return res
      .status(400)
      .json({ success: false, message: "Invalid Credentials" });
  let token = await generateJWTToken(loginUser._id);
  console.log("TOKEN --", token);
  res.cookie("myCookie", token, {
    // maxAge: 1 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    // sameSite: "None",
    secure: true,
    // path
  });
  // console.log("LOGIN USER - ", loginUser);
  res.status(200).json({
    success: true,
    message: "Login successful",
    user: loginUser,
  });

  // console.log("Error in the catch block while logging in the user:", error);
  // res.status(500).json({ success: false, message: "Internal Server Error" });
});
export const logoutUser = expressAsyncHandler(async (req, res) => {
  res.clearCookie("myCookie");
  res.status(200).json({ success: true, message: "User Logout successfully" });
  console.log("USER LOGOUT");
});
export const updateUserDetails = expressAsyncHandler(async (req, res, next) => {
  let currentUserId = req?.user?._id;
  let { name, email } = req.body;
  let updatedUser = await User.findByIdAndUpdate(
    currentUserId,
    { name, email },
    { new: true, runValidators: true }
  );
  if (!updatedUser) return next(new ErrorHandler("user not found", 404));
  res.status(200).json({
    success: true,
    message: "user details updated successfully",
    updatedUser,
  });
});
export const updateUserPassword = expressAsyncHandler(
  async (req, res, next) => {
    let currentUserId = req.user._id;
    let user = await userCollection.findById(currentUserId);

    let { newPassword, confirmNewPassword, oldPassword } = req.body;

    let isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) return next(new ErrorHandler("invalid credentials", 404));

    if (newPassword !== confirmNewPassword)
      return next(new ErrorHandler("passwords do not match", 404));

    user.password = confirmNewPassword; // assigned the new data to the document
    let result = user.save(); // saving the assigned data, this save() will call pre('save') hook.
    console.log(result);
    res.status(200).json({
      success: true,
      message: "user password updated successfully",
    });
  }
);
export const deleteUserProfile = expressAsyncHandler(async (req, res, next) => {
  let currentUserId = req?.user?._id;
  let deletedUser = await userCollection.findByIdAndDelete(currentUserId);
  if (!deletedUser) return next(new ErrorHandler("user not found", 404));
  await blogCollection.deleteMany({ createdBy: currentUserId });
  res.status(200).json({
    success: true,
    message: "user profile deleted successfully",
  });
});
export const getUserProfile = expressAsyncHandler(async (req, res, next) => {
  // let userId = req.params._id;
  let userId = req.params.id;
  // console.log("Requested User ID:", userId);
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }
  let user = await User.findById(userId).select("-password").populate("blogs");
  if (!user) return next(new ErrorHandler("user not found", 404));
  res.status(200).json({
    success: true,
    message: "user profile fetched successfully",
    user,
  });
});

export const isUserLoggedIn = expressAsyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});
