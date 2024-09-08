const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(/* verifyRoles(ROLES_LIST.Admin), */ usersController.getAllUsers)
  .post(usersController.newUser)
  .put(
    /* verifyRoles(ROLES_LIST.Manager, ROLES_LIST.Admin), */
    usersController.updateUserInfo
  )
  .delete(/* verifyRoles(ROLES_LIST.Admin), */ usersController.deleteUser);

module.exports = router;
