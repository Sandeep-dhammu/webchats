import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  token: String,
  expiresIn:String,
  status: { type: String, enum: ["active", "expired"], default: "active" },
});

const Session = mongoose.model("session", SessionSchema);
export default Session;
