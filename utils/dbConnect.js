import mongoose from "mongoose";

export const isConnected = mongoose.connect(process.env.MONGO_CONNECTION);
if (isConnected) {
  console.log("Connected to MongoDB");
} else {
  console.error("Failed to connect to MongoDB");
}
