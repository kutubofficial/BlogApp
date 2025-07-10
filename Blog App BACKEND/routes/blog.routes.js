import { Router } from "express";
import {
  addBlog,
  deleteBlog,
  fetchAllBlog,
  fetchOneBlog,
  updateBlog,
} from "../controller/blog.controller.js";
import authenticate from "../middlewares/auth.middleware.js";
const router = Router();
router.post("/add", authenticate, addBlog);
router.get("/fetch-all", fetchAllBlog);
router.get("/fetch-one/:id", fetchOneBlog);
router.patch("/update/:id", authenticate, updateBlog);
router.delete("/delete/:id", authenticate, deleteBlog);

export default router;
