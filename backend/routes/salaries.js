import express from "express";
import * as Salaries from "../controllers/salaries.js";

const router = express.Router();

/**
 * SALARIES ROUTES
 */

router.get("/", Salaries.getAll); // List all salaries
router.get("/:id", Salaries.getById); // Get salary by id
router.post("/", Salaries.create); // Create new salary
router.put("/:id", Salaries.update); // Update salary by id
router.delete("/:id", Salaries.remove); // Delete salary by id

export default router;
