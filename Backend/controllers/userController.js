import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    // req.user contains userId (from your protect middleware)
    const user = await User.findById(req.user).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profession, location } = req.body;

    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profession = profession;
    user.location = location;

    await user.save();

    res.json({
      profession: user.profession,
      location: user.location,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
