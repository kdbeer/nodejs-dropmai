const mongoose = require('mongoose');
const User = require('../models/user');
const config = require('../config/database');

const ApplicationSchema = mongoose.Schema({
  appId : {
     type:  String,
     required: true
   },
  appMajor : {
    type:  String,
    required: true
  },
  appFacalty : {
    type:  String,
    required: true
  },
  auther : {
    type : String
  },
  dateCreate : {
    type: String,
    required: true
  },
  view : {
    type: Number,
    required: true
  }
});

const Applications = module.exports = mongoose.model('Application', ApplicationSchema);



///Export module here
module.exports.fetchApps = function(callback) {
  let query = { };
  Applications.find(query, callback);
}

module.exports.addApplication = function(newApp, callback) {
  newApp.save(callback);
}

module.exports.updateview = function(obj, callback) {
  let v = obj.view + 1;
  Applications.updateOne(
      { "_id" : obj.id },
      { $set: { "view" : v } }
   , callback);

}

