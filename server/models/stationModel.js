import mongoose from "mongoose";

const stationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  stationName: { type: String, required: true },
  uid: { type: String, required: true },
  aqi: { type: String },
  coordinates: { type: [Number], required: true },
  savedAt: { type: Date, default: Date.now },
});

// Using export default
const Station = mongoose.model("Station", stationSchema);

export default Station;
