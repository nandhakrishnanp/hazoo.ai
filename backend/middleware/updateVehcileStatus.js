const vehicleSchmea = require("../model/vehicleSchmea");




const updateVehicleStatus = async( {
      vehicleId,
    latitude,
    longitude
} , status) => {
    try {
        const vehicle = await vehicleSchmea.findOneAndUpdate(
            { vehicle_id: vehicleId },
            { status: status,
                location:{
                    latitude: latitude,
                    longitude: longitude

                }
             },
            { new: true } 
        );

        if (!vehicle) {
            return { success: false, message: "Vehicle not found" };
        }

        return { success: true, message: "Vehicle status updated successfully", vehicle };
    } catch (error) {
        console.error("Error updating vehicle status:", error);
        return { success: false, message: "Internal server error" };
    }
}


module.exports = {
    updateVehicleStatus
};