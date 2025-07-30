import express from "express";
import * as Info from "../controllers/info.js";

/**
 * COMPANY INFO ROUTES: /api/info (GET, PUT)
 */
const router = express.Router();

router.get("/", Info.get);      // Get info
router.put("/", Info.update);   // Update info

export default router;
