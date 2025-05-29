const vehicleSchmea = require("../model/vehicleSchmea");




const updateVehicleStatus = async( id , status) => {
    try {
        const vehicle = await vehicleSchmea.findOneAndUpdate(
            { vehicle_id: id },
            { status: status },
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