import { Router } from "express";
import {
  deleteUserProfile,
  getUserProfile,
  isUserLoggedIn,
  login,
  logoutUser,
  registerUser,
  updateUserDetails,
  updateUserPassword,
} from "../controller/user.controller.js";
import authenticate from "../middlewares/auth.middleware.js";
const router = Router();
router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", logoutUser);
router.patch("/update-user", updateUserDetails);
router.delete("/delete-user", deleteUserProfile);
router.get("/me", authenticate, isUserLoggedIn);

router.patch("/update-password", authenticate, updateUserPassword);
router.get("/profile/:id", authenticate, getUserProfile);

export default router;
