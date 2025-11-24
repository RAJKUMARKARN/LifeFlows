import express from "express";
import { requestBlood, getAllBloodRequests ,getBloodRequestById} from "../controllers/bloodRequestController.js";

const router = express.Router();

// POST ➝ Create blood request
router.post("/request-blood", requestBlood);

// GET ➝ Get all requests (optional)
router.get("/blood-requests", getAllBloodRequests);

router.get("/:id", getBloodRequestById);

export default router;
