import mongoose from "mongoose";

const BloodRequestSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    hospitalName: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    units: { type: Number, required: true },
    city: { type: String, required: true },
    contact: { type: String, required: true },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("BloodRequest", BloodRequestSchema);
