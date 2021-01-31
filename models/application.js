const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var applicationSchema = new mongoose.Schema({
  resume: {
    file_link:{type: String},
    file_name:{type: String},
  },
  cover_letter:{
    type: String,
  },
  job_id:{
    type: String,
    required: true
  },
  posted_by:{
    type:String,
    required: true
  },
  applied_by:{
    type:String,
    required: true
  },
  application_status: {
    type: String,
    required: true,
    default:'pending'
  },
  is_deleted: {
    type: Boolean
  },
  is_approved: {
    type: Boolean,
    default: false
  },
  current_city: {
    type: String,
  },
  skills_assessment:{
    skills:[String],
    prefrences:{type: String},
    questions:[{
      question:{type:String},  
      answer:{type:String},
    }]
  }
});

applicationSchema.plugin(timestamps);
const application = mongoose.model('applications', applicationSchema);
exports.application = application;