const { loginUser, registerUser } = require('../controllers/userSchmea');

const router = require('express').Router();



router.post('/loginUser', loginUser);
router.post('/registerUser', registerUser);


module.exports = router;