import express from "express";
export const router = express.Router();
import {
  createNewProduct,
  updateProduct,
  getAllProducts,
  deleteProduct,
} from "../../controllers/productsController.js";
import { ROLES_LIST } from "../../config/roles_list.js";
import { verifyRoles } from "../../middleware/verifyRoles.js";

router
  .route("/")
  .get(getAllProducts)
  .post(/* verifyRoles(ROLES_LIST.Admin), */ createNewProduct)
  .put(/* verifyRoles(ROLES_LIST.Admin), */ updateProduct)
  .delete(/* verifyRoles(ROLES_LIST.Admin), */ deleteProduct);
