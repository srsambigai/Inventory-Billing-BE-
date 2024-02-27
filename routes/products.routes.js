const express = require("express");
const {
    addProducts, updateProducts,deleteProduct,getAllProducts
  } = require("../controllers/products.controllers");
  const { isAuth } = require("../utils/authentication");
const { isPrivilegedUser, isAdmin } = require("../utils/authorization");


const router = express.Router();
router.post("/products",isAuth,isAdmin,addProducts);
router.put("/updateProducts/:productid",isAuth,isAdmin,updateProducts);
router.delete("/deleteProducts/:productid",isAuth,isAdmin,deleteProduct);
router.get("/products",isAuth,isAdmin,getAllProducts);

module.exports = router;