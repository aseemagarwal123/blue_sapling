/* eslint-disable linebreak-style */
const router = require('express').Router();

const driverRoute = require('./routes/driverRoute');

router.use('/v1/driver', driverRoute);

module.exports = router;
