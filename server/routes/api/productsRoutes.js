const express = require("express");
const router = express.Router();
const productsController = require("../../controllers/productsController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(
    /* verifyRoles(ROLES_LIST.Admin), */ productsController.createNewProduct
  )
  .put(/* verifyRoles(ROLES_LIST.Admin), */ productsController.updateProduct)
  .delete(
    /* verifyRoles(ROLES_LIST.Admin), */ productsController.deleteProduct
  );

module.exports = router;
