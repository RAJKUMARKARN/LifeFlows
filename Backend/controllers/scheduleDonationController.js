import ScheduleDonation from "../models/ScheduleDonation.js";

export const createScheduleDonation = async (req, res) => {
  try {
    const newEntry = await ScheduleDonation.create(req.body);

    res.status(201).json({
      success: true,
      message: "Donation appointment scheduled successfully",
      data: newEntry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getScheduleDonations = async (req, res) => {
  try {
    const entries = await ScheduleDonation.find().sort({ date: 1 });

    res.status(200).json({
      success: true,
      data: entries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get a single donation by ID
export const getSingleDonation = async (req, res) => {
  try {
    const donation = await ScheduleDonation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving donation", error });
  }
};

