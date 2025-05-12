import dotenv from 'dotenv';
dotenv.config(); // 👈 MUST be called before any environment variables are used

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./Routes/user.Routes.js";

const app = express();

// Verify environment variables are loaded
console.log("Cloudinary Config Check:", {
  cloud: process.env.Cloudnary_Cloud_Name,
  key: process.env.Cloudnary_API_Key?.slice(0, 4) + '***' // Partial log for security
});

const allowedOrigins = [
  "http://localhost:3000",
  "https://full-stack-website-theta.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// Test route to verify Cloudinary config
app.get("/api/test-config", (req, res) => {
  res.json({
    cloud_name: process.env.Cloudnary_Cloud_Name ? "exists" : "missing",
    api_key: process.env.Cloudnary_API_Key ? "exists" : "missing"
  });
});

app.use("/api/v1/users", userRouter);

export default app;