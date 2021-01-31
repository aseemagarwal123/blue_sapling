const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var categorySchema = new mongoose.Schema({
  category:{
    type: String,
  },
  slug:{
    type: String,
  },
  cities:{
    type: [String],
  }
});

categorySchema.plugin(timestamps);
const category = mongoose.model('categorys', categorySchema);
exports.category = category;