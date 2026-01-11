import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  profileImage: {
    type: String,
    default: "",
  }
});

export default mongoose.model("User", userSchema);
