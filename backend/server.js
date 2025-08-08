import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import authRoutes from "./routes/authRoutes.js";

// App Config
const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Verify Server Running
app.get("/", (req, res) => {
  res.send("Server is Running");
});

// Start Server
app.listen(port, () => {
  console.log(`✅ Server is running on port: ${port}`);
});
