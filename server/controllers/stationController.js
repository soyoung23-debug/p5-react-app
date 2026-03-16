// 1. Change require to import (and add the .js extension!)
import Station from "../models/stationModel.js";

// 2. Use 'export const' so your router can find these functions
export const saveStation = async (req, res) => {
  try {
    const { name, uid, aqi, geo } = req.body;

    // Use req.user.id (from your isAllowed middleware)
    const newStation = new Station({
      user: req.user.id,
      stationName: name,
      uid: uid,
      aqi: aqi,
      coordinates: geo,
    });

    await newStation.save();
    res.status(201).json({ message: "Station saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSavedStations = async (req, res) => {
  try {
    const stations = await Station.find({ user: req.user.id });
    res.status(200).json(stations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
