const express = require("express");
const router = express.Router();
const updatesController = require("../../controllers/updatesController");

router
  .route("/")
  .get(updatesController.getAllUpdates)
  .post(updatesController.createNewUpdate)
  .delete(updatesController.deleteUpdates);

router.route("/admin").post(updatesController.createAdminUpdate);
router.route("/add").post(updatesController.createAddUpdate);
router.route("/remove").post(updatesController.createRemoveUpdate);

module.exports = router;
