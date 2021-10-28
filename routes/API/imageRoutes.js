const router = require("express").Router();
const controller = require("../../controller/imagesController.js");

router
  .route("/")
  .get(controller.all)
  // .post(controller.create)

router
  .route("/:id")
  .get(controller.findById)
//   .post(controller.update)
//   .delete(controller.remove)

module.exports = router;