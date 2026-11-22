// server.js
// This is the starting point of the backend. Run it with: npm start

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";

// Read the .env file so process.env.PORT and process.env.MONGODB_URI work
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS lets the React app (port 5173) talk to this server (port 5001)
app.use(cors());

// Lets Express read JSON sent by fetch. The limit is bigger than the default
// (100kb) because a whole book can be long.
app.use(express.json({ limit: "10mb" }));

// Every route inside bookRoutes starts with /api/books
app.use("/api/books", bookRoutes);

// A simple check so you can open http://localhost:5001 in the browser
app.get("/", (req, res) => {
  res.send("BookShelf API is running");
});

// Connect to MongoDB first, then start listening for requests
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
  });
};

startServer();
