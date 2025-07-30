import express from "express";
import * as Projects from "../controllers/projects.js";

const router = express.Router();

/**
 * PROJECTS ROUTES
 */

router.get("/", Projects.getAll); // List all projects
router.get("/:id", Projects.getById); // Get project by id
router.post("/", Projects.create); // Create new project
router.put("/:id", Projects.update); // Update project by id
router.delete("/:id", Projects.remove); // Delete project by id

export default router;
