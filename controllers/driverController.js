const createError = require('http-errors');
const {driver} = require('../models/driver');
const {HttpCodes,CustomErrors,surgeObject} = require('../response');
const jwt = require("jsonwebtoken");
const BASE_FARE=50;
const CHARGES_PER_UNIT_TIME=1;
const CHARGES_WAITING_TIME=10;

async function fareCalculate(req, res, next) {
    try {
      var distanceTravelled = Number(req.body.distance_travelled)
      var travelTime = Number(req.body.travel_time)
      var ratePerKm = Number(req.body.rate_per_km)
      var surge = req.body.surge || "low";
      var waitingTime = Number(req.body.waiting_time);
      var rideCancelledAfter = req.body.ride_cancel_after || false;
      var rideCancelledBefore = req.body.ride_cancel_before || false;
      var total_fare = 0;
      var cancellationCharges = 0;
      total_fare += BASE_FARE
      var chargesTravelTime = CHARGES_PER_UNIT_TIME * travelTime;
      var chargesWaitingTime = waitingTime <= 4 ? CHARGES_WAITING_TIME * waitingTime : CHARGES_WAITING_TIME * Math.floor(waitingTime);
      total_fare+=chargesTravelTime+chargesWaitingTime+(distanceTravelled*ratePerKm);
      total_fare*=surgeObject[surge];
      if (rideCancelledAfter || rideCancelledBefore) {
        chargesWaitingTime = 0
        if (waitingTime > 4) {
          cancellationCharges = 50
        }
        if (rideCancelledBefore) {
            total_fare = cancellationCharges;
        }
      }
      total_fare = total_fare > BASE_FARE ? total_fare : BASE_FARE;
      return res.status(HttpCodes.OK).send({
        'response': {
          'message': "fare calulated",
          'result': {
            'fare': Number(total_fare.toFixed(2))
          }
        },
    });

    } catch (ex) {
      next(ex)
    }
}

async function driverAssign(req, res, next) {
  try {
    var customerType = req.query.type;
    var driverObject=null;
    console.log(customerType)
    if (customerType == 'platinum') {
      driverObject = await driver.findOne({eligible:true,booked: false,rating: {$gt: 4.8}});
    } else if (customerType == 'gold'){
      driverObject = await driver.findOne({eligible:true,booked: false,rating: {$gt: 4.5}});
    }
    if(!driverObject){
       driverObject = await driver.findOne({eligible:true,booked: false});
    }
    console.log(driverObject);
    if(driverObject){
        driverObject = await driver.findOneAndUpdate({_id:driverObject._id},{$set:{booked:true}},{new:true});
    }
    console.log(driverObject);
    return res.status(HttpCodes.OK).send({
        'response': {
          'message': driverObject ? 'driver assigned' : "no drivers found",
          'result': {
            'driver': driverObject
          }
        },
    });
  } catch (ex) {
    next(ex)
  }
}

async function driverRating(req, res, next) {
    try {
      const diverId = req.params.id;
      const rating= req.body.rating;
      var driverObject = await driver.findOne({_id:diverId});
      if(!driverObject || !driverObject.eligible){
        return res.status(406).send({
          'response': {
            'message': driverObject ? "Cannot rate an uneligible driver": "No driver found with the given Id",
            'result': {
              'driver': null
            }
          },
      });
      }
      var driverObject = await driver.findOneAndUpdate({_id:diverId},{$push:{previous_ratings:rating},$set:{booked:false}},{new:true});
      var length_ratings = driverObject.previous_ratings.length;
      var sum = driverObject.previous_ratings.reduce(function(a, b){return a + b;}, 0);
      if(length_ratings==5 && sum/5 < 4 ){
        driverObject = await driver.findOneAndUpdate({_id:diverId},{$set:{eligible:false}},{new:true});
      }
      if(length_ratings<=5){
        driverObject = await driver.findOneAndUpdate({_id:diverId},{$set:{rating:5}},{new:true});
      }
      else if(length_ratings>5){
        driverObject = await driver.findOneAndUpdate({_id:diverId},{$set:{rating:sum/length_ratings}},{new:true});
      }
      return res.status(HttpCodes.OK).send({
          'response': {
            'message': "Thanks for Travelling with us",
            'result': {
              'driver': driverObject
            }
          },
      });
    } catch (ex) {
      next(ex)
    }
}

module.exports = {
  fareCalculate,
  driverAssign,
  driverRating
};
