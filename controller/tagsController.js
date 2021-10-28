const db = require("../models");

module.exports = {
  all: function (req, res) {
    db.Tags.all(function(data) {
      res.json(data);
    });
  },
  findByImageId: function (req, res) {
    db.Tags.findById(req.params.id, function(data) {
      res.json(data)
    });
  },
  findTagsByImageId: function (req, res) {
    db.Tags.findTagsById(req.params.id, function(data) {
      res.json(data)
    });
  },
  incrementAccepted: function (req, res) {
    let conditions = "";
    let vals =[];
    for (let i=0; i<req.body.tag.length; i++) {
      if(i>0) conditions+=" OR ";
      conditions+="`image_id` = ? AND `tag` = ?";

      vals.push(req.body.image_id);
      vals.push(req.body.tag[i]);
    }
    console.log('req.body', req.body);
    db.Tags.incrementAccepted(conditions, vals, function(data) {
      res.json(data)
    });
  },
  incrementRejected: function (req, res) {
    let conditions = "";
    let vals =[];
    for (let i=0; i<req.body.tag.length; i++) {
      if(i>0) conditions+=" OR ";
      conditions+="`image_id` = ? AND `tag` = ?";

      vals.push(req.body.image_id);
      vals.push(req.body.tag[i]);
    }
    console.log('req.body', req.body);
    db.Tags.incrementRejected(conditions, vals, function(data) {
      res.json(data)
    });
  },
};
