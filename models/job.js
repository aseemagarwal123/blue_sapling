const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  posted_by:{
    type:String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  interview_type: {
    type: String,
    required: true
  },
  cities: {
    type: [String],
  },
  allowed_cities:{
    type:[String]
  },
  is_deleted: {
    type: Boolean
  },
  is_approved: {
    type: Boolean,
    default: false
  },
  opening_count: {
    type : Number,
    required : true,
    validate : {
      validator : Number.isInteger,
      message   : '{VALUE} is not an integer value'
    }
  },
  description: {
    type: String,
    required: true
  },
  ctc: {
    min:{type: String},
    max:{type: String},
    breakup_type:{type:String},
    fixed_pay:{type: String},
    variable_pay:{type: String},
    incentives:{type: String},
    perks:[String]    
  },
  skills_assessment:{
    skills:[String],
    prefrences:{type: String},
    questions:[String]
  }
});

jobSchema.plugin(timestamps);
const job = mongoose.model('jobs', jobSchema);
exports.job = job;