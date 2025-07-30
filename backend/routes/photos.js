import express from "express";
import * as Photos from "../controllers/photos.js";

/**
 * PHOTOS ROUTES (scoped to a project: /api/projects/:id/photos & /:photoId)
 * Nested under project id param.
 */
const router = express.Router({ mergeParams: true });

router.get("/", Photos.getAll); // Get all photos for project
router.post("/", Photos.create); // Add new photo to project

router.get("/:photoId", Photos.getById); // Get photo by id
router.put("/:photoId", Photos.update); // Update photo by id
router.delete("/:photoId", Photos.remove); // Delete photo by id

export default router;
