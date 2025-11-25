import mongoose from "mongoose";

const scheduleDonationSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    date: { type: String, required: true },
    timeRange: { type: String, required: true },
    bloodType: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("ScheduleDonation", scheduleDonationSchema);
