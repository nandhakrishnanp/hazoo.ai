const  { getAllVehicles , getVehicleById ,addVehicle , getVechicleConfig ,updateVehicleConfig } =  require("../controllers/vehicleController");

const express = require("express");
const router = express.Router();

router.get("/", getAllVehicles);
router.get("/:id", getVehicleById);
router.post("/new", addVehicle);
router.get("/:id/config", getVechicleConfig);
router.put("/:id/config", updateVehicleConfig);


module.exports = router;





