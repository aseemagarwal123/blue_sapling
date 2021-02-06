/* eslint-disable linebreak-style */
const router = require('express').Router();


const driverRoute = require('./routes/driverRoute');
const collegeRoute = require('./routes/collegeRoute');

router.use('/v1/driver', driverRoute);
router.use('/v1/college', collegeRoute);

module.exports = router;
