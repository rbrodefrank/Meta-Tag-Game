// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var Tags = {
  all: function(cb) {
    orm.all("tags", function(res) {
      cb(res);
    });
  },
  findById: function(val, cb) {
    orm.findByValue("tags", "image_id", val, function(res) {
      cb(res);
    });
  },
  findTagsById: function(val, cb) {
    orm.findQueryByValue("tag","tags", "image_id", val, function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("tags", cols, vals, function(res) {
      cb(res);
    });
  },
  incrementAccepted: function (condition, vals, cb) {
    orm.incrementUpdate("tags","`accepted`", condition, vals, function(res) {
      cb(res);
    });
  },
  incrementRejected: function (condition, vals, cb) {
    orm.incrementUpdate("tags","`rejected`", condition, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("tags", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("tags", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (tagsController.js).
module.exports = Tags;
