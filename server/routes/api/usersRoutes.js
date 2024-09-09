import express from "express";
export const router = express.Router();
import {
  getAllUsers,
  newUser,
  updateUserInfo,
  deleteUser,
} from "../../controllers/usersController.js";

import { ROLES_LIST } from "../../config/roles_list.js";
import { verifyRoles } from "../../middleware/verifyRoles.js";

router
  .route("/")
  .get(/* verifyRoles(ROLES_LIST.Admin), */ getAllUsers)
  .post(newUser)
  .put(
    /* verifyRoles(ROLES_LIST.Manager, ROLES_LIST.Admin), */
    updateUserInfo
  )
  .delete(/* verifyRoles(ROLES_LIST.Admin), */ deleteUser);
