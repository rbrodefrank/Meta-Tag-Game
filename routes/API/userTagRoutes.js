const router = require("express").Router();

const controller = require("../../controller/userTagController.js");

router
  .route("/")
  .get(controller.all)
  .post(controller.createUserTag)

module.exports = router;