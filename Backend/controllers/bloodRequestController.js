import BloodRequest from "../models/BloodRequest.js";

// Submit a new blood request
export const requestBlood = async (req, res) => {
  try {
    const newRequest = await BloodRequest.create(req.body);

    res.status(201).json({
      success: true,
      message: "Blood request successfully submitted",
      data: newRequest,   // 👈 Return the full saved document
    });
  } catch (err) {
    console.error("Error submitting request:", err);
    res.status(500).json({
      success: false,
      message: "Server error while submitting request",
    });
  }
};
// Fetch all requests (Optional: use for admin panel or donor dashboard)
export const getAllBloodRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch requests" });
  }
};

// Get a specific blood request by ID
export const getBloodRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await BloodRequest.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Blood request not found" });
    }

    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ message: "Error fetching request" });
  }
};
