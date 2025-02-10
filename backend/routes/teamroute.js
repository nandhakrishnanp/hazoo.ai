const { getALLTeams } = require("../controllers/teamcontroller");
const router = require("express").Router();





router.get("/", getALLTeams);


module.exports = router;