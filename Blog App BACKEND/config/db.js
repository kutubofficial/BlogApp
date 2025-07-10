import mongoose from "mongoose";

export const connectDB = async () => {
  const MONGODB_URL=process.env.MONGODB_URL
  const MONGODB_ATLAS=process.env.MONGODB_ATLAS
  try {
    const client = await mongoose.connect(MONGODB_ATLAS);
    // console.log("Database connected successfully!", client.connection.host);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};
