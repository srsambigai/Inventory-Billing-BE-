const express = require("express");
const {
    getAllStocks
  } = require("../controllers/stock.controllers");

  const { isAuth } = require("../utils/authentication");
const { isPrivilegedUser, isAdmin } = require("../utils/authorization");


const router = express.Router();

router.get("/stocks",isAuth,isAdmin,getAllStocks);

module.exports = router;