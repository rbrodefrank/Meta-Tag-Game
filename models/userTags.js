var orm = require("../config/orm.js");

var UserTags = {
  all: function(cb) {
    orm.all("user_tags", function(res) {
      cb(res);
    });
  },
  findById: function(val, cb) {
    orm.findByValue("user_tags", "image_id", val, function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("user_tags", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("user_tags", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("user_tags", condition, function(res) {
      cb(res);
    });
  }
}

// Export the database functions for the controller (userTagsController.js).
module.exports = UserTags;