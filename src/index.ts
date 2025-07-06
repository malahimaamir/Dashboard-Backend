// File: src/index.ts or server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes";
import employeeRoutes from "./routes/employeeRoutes"; // ✅ new import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Working CORS — KEEP YOUR ORIGINAL SETUP
app.use(
  cors({
    origin: "http://localhost:8080", // ✅ DON'T CHANGE — matches your frontend
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoutes);               // your working auth routes
app.use("/api/employees", employeeRoutes);      // 🚀 new employee routes added

// ✅ Connect to MongoDB — USE YOUR ORIGINAL CONNECTION STRING
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/empowerDashboard")
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
