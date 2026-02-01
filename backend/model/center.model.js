import mongoose from "mongoose";

const centreSchema = new mongoose.Schema({
  centreName: { type: String, required: true },
  managerName: { type: String, required: true },
  centreAddress: { type: String, required: true },
  centreCity: { type: String, required: true },
  centreDistrict: { type: String, required: true },
  centreState: { type: String, required: true },
  centrePincode: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  maxCapacity: { type: Number, default: 100 },
  currentOccupancy: { type: Number, default: 0 },
}, { timestamps: true });

export const Centre = mongoose.model("Centre", centreSchema);
