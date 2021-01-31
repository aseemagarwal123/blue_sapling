const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var resumeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  middle_name: {
    type: String,
    default: ''
  },
  last_name: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true,
    unique:true
  },
  date_of_birth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  martial_status: {
    type: String,
    enum: ['single', 'married', 'other'],
    required: true
  },
  city: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },
  phone: {
    type: Number
  },
  email: {
    type: String,
    required: true
  },
  website: {
    type: String
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
    },
    lat: {
      type: String
    },
    long: {
      type: String
    },
    src: {
      type: String
    }
  },
  educational_details: [{
    graduation: {
      type: String
    },
    school: {
      type: String
    },
    certification: {
      type: String
    },
    level: {
      type: String
    },
    title: {
      type: String
    },
    additional_information: {
      type: String
    }
  }],
  work_experience: [{
    company_name: {
      type: String
    },
    position: {
      type: String
    },
    location: {
      type: String
    },
    date_from: {
      type: Date,
    },
    date_to: {
      type: Date,
    },
    additional_information: {
      type: String
    }
  }],

  skills: [{
    name: {
      type: String
    },
    proficiency: {
      type: String
    }
  }],

  is_deleted: {
    type: Boolean
  },
  is_approved: {
    type: Boolean,
  }
});

resumeSchema.plugin(timestamps);
const resume = mongoose.model('resumes', resumeSchema);
exports.resume = resume;