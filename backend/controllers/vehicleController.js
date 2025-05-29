
const vehicleSchmea = require("../model/vehicleSchmea");





const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await vehicleSchmea.find();
        res.status(200).json(vehicles);
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    }
const getVehicleById = async (req, res) => {
    const { id } = req.params;
    try {
        const vehicle = await vehicleSchmea.find({
            vehicle_id: id
        });
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        console.error("Error fetching vehicle:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const addVehicle = async (req, res) => {
    const { vehicle_id, vehicle_type, vehicle_number } = req.body;

    try {
        const newVehicle = new vehicleSchmea({
            vehicle_id,
            vehicle_type,
            vehicle_number
        });

        await newVehicle.save();
        res.json({ message: "Vehicle added successfully", vehicle: newVehicle }).status(201);
    } catch (error) {
        console.error("Error adding vehicle:", error);
        res.json({ message: "Internal server error" }).status(500);
    }
}


const getVechicleConfig  =async (res, req) => {
    try {
        const vehicle = await vehicleSchmea.findOne({ vehicle_id: req.params.id });

        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
         const config ={
             mode: vehicle.mode,
                range: vehicle.range,
                rtsp: {
                    username: vehicle.rtsp.username,
                    password: vehicle.rtsp.password
                }
         }
        res.status(200).json(config);
    } catch (error) {
        console.error("Error fetching vehicle config:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const updateVehicleConfig = async (req, res) => {
    const { id } = req.params;
    const {  mode, range, rtsp } = req.body;
    console.log(id , mode, range, rtsp);
    try {
        const vehicle = await vehicleSchmea.findOneAndUpdate(
            { vehicle_id: id },
            { mode, range, rtsp },
            { new: true }
        );

        if (!vehicle) {
            return res.json({ message: "Vehicle not found" });
        }

        res.status(200).json({ message: "Vehicle config updated successfully", vehicle });
    } catch (error) {
        console.error("Error updating vehicle config:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}



module.exports = {
    getAllVehicles,
    getVehicleById,
    addVehicle,
    getVechicleConfig,
    updateVehicleConfig
};