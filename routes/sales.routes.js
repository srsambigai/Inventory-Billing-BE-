const express = require("express");
const {
    getSalesReport
  } = require("../controllers/sales.controllers");

  const { isAuth } = require("../utils/authentication");
const { isPrivilegedUser, isAdmin } = require("../utils/authorization");


const router = express.Router();

router.get("/sales/:billingdate",isAuth,isAdmin,getSalesReport);

module.exports = router;