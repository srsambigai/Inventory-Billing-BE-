const express = require("express");
const {
    addCustomers,updateCustomers,deleteCustomer,getAllCustomers
  } = require("../controllers/customers.controllers");

  const { isAuth } = require("../utils/authentication");
const { isPrivilegedUser, isAdmin } = require("../utils/authorization");


const router = express.Router();
router.post("/customers",isAuth,isAdmin,addCustomers);
router.put("/updateCustomers/:customerid",isAuth,isAdmin,updateCustomers);
router.delete("/deleteCustomers/:customerid",isAuth,isAdmin,deleteCustomer);
router.get("/customers",isAuth,isAdmin,getAllCustomers);

module.exports = router;