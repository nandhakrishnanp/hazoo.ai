const TeamSchmea = require("../model/TeamSchmea");






const getALLTeams = async (req, res) => {
    try {
        const allTeams = await TeamSchmea.find();
        res.status(200).json(allTeams);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}






module.exports = {getALLTeams }