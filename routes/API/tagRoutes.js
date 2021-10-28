const router = require("express").Router();
const controller = require("../../controller/tagsController.js");

router
  .route("/")
  .get(controller.all)

router
  .route("/:id")
  .get(controller.findByImageId)

router
  .route("/tag/:id")
  .get(controller.findTagsByImageId)

router
  .route("/accepted/")
  .put(controller.incrementAccepted)

router
  .route("/rejected/")
  .put(controller.incrementRejected)

module.exports = router;