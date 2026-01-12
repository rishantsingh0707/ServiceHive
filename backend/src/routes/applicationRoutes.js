import express from "express";
import { applyToGig, getApplicationsByGig, hireFreelancer,getMyApplications } from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isFreelancer, isClient } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, isFreelancer, applyToGig);
router.get("/gig/:gigId", protect, isClient, getApplicationsByGig);
router.post("/hire/:applicationId", protect, isClient, hireFreelancer);
router.get("/my", protect, isFreelancer, getMyApplications);
export default router;
