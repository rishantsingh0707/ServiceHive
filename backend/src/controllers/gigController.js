import Gig from "../models/Gig.js";

/* Create Gig (Client only) */
export const createGig = async (req, res) => {
  try {
    const { title, description, budget, deadline } = req.body;

    if (!title || !description || !budget || !deadline) {
      return res.status(400).json({ message: "All fields required" });
    }

    const gig = await Gig.create({
      title,
      description,
      budget,
      deadline,
      createdBy: req.user._id
    });

    res.status(201).json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Get all open gigs (public) */
export const getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ status: "open" })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Get logged-in client's gigs */
export const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ createdBy: req.user._id }).sort({
      createdAt: -1
    });
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Mark Gig as Completed (Client only) */
export const completeGig = async (req, res) => {
  try {
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    if (gig.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (gig.status !== "in-progress") {
      return res.status(400).json({
        message: "Only in-progress gigs can be completed"
      });
    }

    gig.status = "completed";
    await gig.save();

    res.json({
      message: "Gig marked as completed",
      gig
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
