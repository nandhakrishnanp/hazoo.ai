const { addmorehazrds ,getAllHazards , createHazard ,resolveHazards, verifyHazard } = require("../controllers/hazardcontroller");

const router = require('express').Router();


router.post('/createhazard', createHazard);
router.post('/addmorehazrds', addmorehazrds);
router.get('/getallhazards', getAllHazards);
router.post('/resolveHazard', resolveHazards);
router.post('/verifyHazard', verifyHazard);

module.exports = router;
