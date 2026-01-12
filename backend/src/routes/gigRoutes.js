import express from "express";
import { createGig, getAllGigs, getMyGigs, completeGig,getAllGigsBySearch } from "../controllers/gigController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isClient } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getAllGigs);
router.post("/", protect, isClient, createGig);
router.get("/my-gigs", protect, isClient, getMyGigs);
router.get("/", protect, getAllGigsBySearch);

router.post("/:gigId/complete", protect, isClient, completeGig);

export default router;
