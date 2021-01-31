const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

var userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  image_url: {
      type: String,
      default:''
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
  },
  password: {
    type: String
  },
  roles: {
    type: [String],
    required: true
  },
  phone: {
    type: Number
  },
  is_deleted: {
    type: Boolean
  },
  is_approved: {
    type: Boolean,
    default: false
  },
  email_verified: {
    type: Boolean,
    default: false
  },
  phone_verified: {
    type: Boolean,
    default: false
  },
  organization_verified: {
    type: Boolean,
    default: false
  },
  organization_verifing_method: {
    website_link:{
       type: String,
    },
    cnn_number:{
       type: String,
    },
    document:{
       type: String,
    }
  },
  user_type:{
   type: String,
   required: true
  },
  user_sub_type:{
    type: String,
   },
  organization_name:{
    type: String
  },
  organization_description:{
    type: String
  },
  user_description:{
    type: String
  },
  user_education:{
    type: [String]
  },
  resume: {
    file_link:{type: String},
    file_name:{type: String},
  },
  user_skills:{
    type: [String]
  },
  address: {
    line1: {
      type: String
    },
    line2: {
      type: String
  },
    line3: {
      type: String
  }, lat: {
      type: String
  },
    long: {
      type: String
  }, src: {
      type: String
  }
  }

});

userSchema.plugin(timestamps);
const user = mongoose.model('users', userSchema);
exports.user = user;