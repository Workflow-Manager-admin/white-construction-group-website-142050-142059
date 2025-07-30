import express from "express";
import dotenv from "dotenv";
import projectsRoutes from "./routes/projects.js";
import photosRoutes from "./routes/photos.js";
import infoRoutes from "./routes/info.js";
import salariesRoutes from "./routes/salaries.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/projects", projectsRoutes);
app.use("/api/projects/:id/photos", photosRoutes); // Maps to /api/projects/:id/photos
app.use("/api/info", infoRoutes);
app.use("/api/salaries", salariesRoutes);

// Healthcheck
app.get("/", (req, res) => {
  res.json({ status: "Backend API running." });
});

// Error handling (basic)
app.use((err, req, res, next) => {
  console.error("API error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(port, () => {
  console.log(`Backend server started on port ${port}`);
});
