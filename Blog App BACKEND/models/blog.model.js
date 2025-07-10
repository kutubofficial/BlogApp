import { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      minLength: [10, "minimum 10 words are required"],
    },
    image: {
      type: String,
      //image-URL here
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6LXNJFTmLzCoExghcATlCWG85kI8dsnhJng&s",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
  },
  { timestamps: true }
);
const Blog = model("Blog", blogSchema);
export default Blog;
