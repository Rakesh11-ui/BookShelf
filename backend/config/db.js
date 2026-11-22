// config/db.js
// This file has ONE job: connect our app to MongoDB using Mongoose.

import mongoose from "mongoose";

const connectDB = async () => {
  // The connection string lives in the .env file, never in the code
  if (!process.env.MONGODB_URI) {
    console.log("MONGODB_URI is missing. Check your backend/.env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    // If the database is not reachable there is no point starting the server
    console.log("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
