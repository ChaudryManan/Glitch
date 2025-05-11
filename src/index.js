import connectDB from "./db/index.js";
import app from "./app.js";

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1); // stop the app if DB fails
  });

// Handle application-level errors
app.on("error", (error) => {
  console.error("❌ App encountered an error:", error);
  process.exit(1);
});

// Optional: Handle termination signals (e.g., Docker or process manager stops the app)
process.on("SIGTERM", () => {
  console.log("⚠️ App is shutting down (SIGTERM received).");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("⚠️ App is shutting down (SIGINT received).");
  process.exit(0);
});
