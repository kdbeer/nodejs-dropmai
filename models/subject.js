const mongoose = require('mongoose');
const config = require('../config/database');


//Subject schema

const SubjectSchema = mongoose.Schema({
  appId : {
    type: String,
    required  : true
  },
  subjectId : {
    type: String,
    required : true
  },
  subjectName : {
    type: String,
    required  : true
  },
  weight : {
    type: Number,
    required  : true
  },
  mean : {
    type: Number,
    required  : true
  },
  vote_score : {
    type: Number,
    required  : true
  }
});

const Subject = module.exports = mongoose.model('Subject', SubjectSchema);
module.exports.addSubject = function(newSubject, callback) {
  newSubject.save(callback);
}

module.exports.getSubjectsInApp = function(appId, callback) {
  let query = { appId : appId };
  Subject.find(query, callback);
}
