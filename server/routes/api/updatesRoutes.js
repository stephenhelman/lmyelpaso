import express from "express";
export const router = express.Router();
import {
  getAllUpdates,
  createNewUpdate,
  deleteUpdates,
  createAdminUpdate,
  createAddUpdate,
  createRemoveUpdate,
} from "../../controllers/updatesController.js";

router
  .route("/")
  .get(getAllUpdates)
  .post(createNewUpdate)
  .delete(deleteUpdates);

router.route("/admin").post(createAdminUpdate);
router.route("/add").post(createAddUpdate);
router.route("/remove").post(createRemoveUpdate);
