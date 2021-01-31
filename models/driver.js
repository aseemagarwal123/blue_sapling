const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');


var driverSchema = new mongoose.Schema({
  name:{
    type: String,
  },
  rating:{
    type: Number,
    default:null
  },
  rides:{
    type: Number,
  },
  booked:{
    type: Boolean,
    default:false
  },
  eligible:{
    type: Boolean,
    default:true
  },
  previous_ratings:{
    type: [Number]
  }
});

driverSchema.plugin(timestamps);
driverSchema.index({'rating': -1});
const driver = mongoose.model('drivers', driverSchema);
exports.driver = driver;