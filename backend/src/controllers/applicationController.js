import Application from "../models/Application.js";
import Gig from "../models/Gig.js";
import mongoose from "mongoose";

/* Apply to a Gig (Freelancer only) */
export const applyToGig = async (req, res) => {
  try {
    const { gigId, proposal } = req.body;

    if (!gigId || !proposal) {
      return res.status(400).json({ message: "All fields required" });
    }

    const gig = await Gig.findById(gigId);
    if (!gig || gig.status !== "open") {
      return res.status(400).json({ message: "Gig not available" });
    }

    const application = await Application.create({
      gigId,
      freelancerId: req.user._id,
      proposal
    });

    res.status(201).json(application);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Already applied to this gig" });
    }
    res.status(500).json({ message: error.message });
  }
};

/* Get applications for a gig (Client only) */
export const getApplicationsByGig = async (req, res) => {
  try {
    const { gigId } = req.params;
console.log(gigId);
    const applications = await Application.find({ gigId })
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

      console.log(applications);
    res.json(applications);
  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const hireFreelancer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId)
      .session(session);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const gig = await Gig.findById(application.gigId).session(session);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    if (gig.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (gig.status !== "open") {
      return res.status(400).json({ message: "Gig already hired" });
    }

    await Application.updateMany(
      { gigId: gig._id },
      { status: "rejected" },
      { session }
    );

    application.status = "accepted";
    await application.save({ session });

    gig.status = "in-progress";
    await gig.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({
      message: "Freelancer hired successfully",
      application
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

export const getMyApplications = async (req, res) => {
  const applications = await Application.find({
    freelancerId: req.user._id
  }).populate("gigId", "title");

  res.json(applications);
};
