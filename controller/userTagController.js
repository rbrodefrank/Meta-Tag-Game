const db = require("../models");

module.exports = {
  all: function (req, res) {
    db.UserTags.all(function(data) {
      res.json(data);
    });
  },
  findByImageId: function (req, res) {
    db.UserTags.findById(req.params.id, function(data) {
      res.json(data);
    });
  },
  createUserTag: function (req, res) {
    let vals = [];
    let cols = ["`tag`", "`image_id`"];
    vals.push(req.body.tag);
    vals.push(req.body.image_id);
    db.UserTags.create(cols, vals, function (data) {
      res.json(data);
    });
  }
};