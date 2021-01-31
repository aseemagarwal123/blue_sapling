const router = require('express').Router();
const {fareCalculate,driverAssign,driverRating} = require('../controllers/driverController');
const {validateCalculate,validateAssign,validateRating} = require('../middlewares/validation');
router.post('/calculate', validateCalculate,fareCalculate);
router.get('/assign', validateAssign, driverAssign);
router.put('/rate/:id', validateRating, driverRating);


module.exports = router;
