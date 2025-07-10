import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    totalBlogs: {
      type: Number,
      default: 0,
    },
    // blogs: {
    //   type: Array,
    //   default: [],
    //   ref:"Blog"
    // },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields automatically
  }
);

userSchema.pre("save", async function () {
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

userSchema.methods.comparePassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

const User = model("User", userSchema);

export default User;
