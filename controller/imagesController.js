const db = require("../models");

// Defining methods for the POSController
module.exports = {
  all: function (req, res) {
    db.Images.all(function(data) {
      res.json(data);
    });
  },
  findById: function (req, res) {
    console.log("param.id: ", req.params.id)
    db.Images.findById(req.params.id, function(data) {
      res.json(data)
    });
  },
};
