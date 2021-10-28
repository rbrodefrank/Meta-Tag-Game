// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var Images = {
  all: function(cb) {
    orm.all("images", function(res) {
      cb(res);
    });
  },
  findById: function(val, cb) {
    orm.findByValue("images", "image_id", val, function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  // create: function(cols, vals, cb) {
  //   orm.create("images", cols, vals, function(res) {
  //     cb(res);
  //   });
  // },
  // update: function(objColVals, condition, cb) {
  //   orm.update("images", objColVals, condition, function(res) {
  //     cb(res);
  //   });
  // },
  // delete: function(condition, cb) {
  //   orm.delete("images", condition, function(res) {
  //     cb(res);
  //   });
  // }
};

// Export the database functions for the controller (imagesController.js).
module.exports = Images;
