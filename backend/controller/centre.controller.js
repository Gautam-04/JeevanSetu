import mongoose from "mongoose";
import { Centre } from "../model/center.model.js";

const registerCentre = async(req,res) => {
    try {
    const { centreName, managerName, centreAddress, centreCity, centreDistrict, centreState, centrePincode, contactNumber, email, maxCapacity} = req.body;

    if ( !centreName || !managerName || !centreAddress || !centreCity || !centreDistrict || !centreState || !centrePincode || !contactNumber || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingCentre = await Centre.findOne({ centrePincode });
    if (existingCentre) {
        return res.status(400).json({
        message: "Centre with this pincode already exists",
        });
    }

    const centre = await Centre.create({
        centreName,
        managerName,
        centreAddress,
        centreCity,
        centreDistrict,
        centreState,
        centrePincode,
        contactNumber,
        email,
        maxCapacity,
    });

    return res.status(201).json({
        message: "Centre registered successfully",
        centre,
    });
    } catch (error) {
    return res.status(500).json({
        message: "Centre registration failed",
        error: error.message,
        });
    }
}

const updateCentre = async(req,res) => {
    try {
    const { id } = req.params;

    const updatedCentre = await Centre.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!updatedCentre) {
        return res.status(404).json({ message: "Centre not found" });
    }

    return res.status(200).json({
        message: "Centre updated successfully",
        centre: updatedCentre,
        });
    } catch (error) {
    return res.status(500).json({
        message: "Failed to update centre",
        error: error.message,
        });
    }
}

const getCentreDetails = async(req,res) => {
    try {
        const centers = await Centre.find();

    res.status(200).json({
        success: true,
        count: centers.length,
        data: centers,
    });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Failed to fetch center details",
        error: error.message,
        });
    }
}

const deleteCentre = async (req, res) => {
  try {
    const { id } = req.params;

    const centre = await Centre.findByIdAndDelete(id);

    if (!centre) {
        return res.status(404).json({
        message: "Centre not found",
        });
    }

    return res.status(200).json({
        message: "Centre deleted successfully",
    });
    } catch (error) {
    return res.status(500).json({
        message: "Failed to delete centre",
        error: error.message,
        });
    }
};


export {registerCentre, updateCentre, getCentreDetails, deleteCentre};