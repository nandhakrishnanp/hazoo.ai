const { loginadmin, registeradmin } = require('../controllers/admincontroller');
const router = require('express').Router();




router.post('/loginadmin', loginadmin);
router.post('/registeradmin', registeradmin);


module.exports = router;