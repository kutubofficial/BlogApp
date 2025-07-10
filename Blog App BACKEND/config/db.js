import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const client = await mongoose.connect(process.env.MONGODB);
    console.log("Database connected successfully!", client.connection.host);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};
