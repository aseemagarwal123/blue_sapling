const mongoose = require('mongoose');
const policySchema = new mongoose.Schema({
  'policy_id': {type: Number},
  'date_of_purchase': {type: String},
  'customer_id': {type: Number},
  'fuel': {type: String},
  'vehicle_segment': {type: String},
  'premium': {type: Number},
  'bodily_injury_liability': {type: Number},
  'personal_injury_protection': {type: Number},
  'property_damage_liability': {type: Number},
  'collision': {type: Number},
  'comprehensive': {type: Number},
  'customer_gender': {type: String},
  'customer_income group': {type: String},
  'customer_region': {type: String},
  'customer_marital_status': {type: Number},
});
policySchema.index({'policy_id': 1, 'customer_id': 1});
const policy = mongoose.model('policy', policySchema);
exports.policy = policy;
