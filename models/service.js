const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var serviceSchema = new mongoose.Schema({
  category:{
    type: String,
  },
  city:{
    type: String,
  },
  name_of_organization:{
    type: String,
  },
  description: {
    type: String,
  },
  website: {
    type: String,
  },
  phone: {
    type: Number,
  },
  is_deleted: {
    type: Boolean
  },
  is_approved: {
    type: Boolean,
    default: false
  },
  tags: {
    type: [String],
  },
  Address:{
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
    },  src: {
        type: String
    }
  }
});

serviceSchema.plugin(timestamps);
const service = mongoose.model('services', serviceSchema);
exports.service = service;