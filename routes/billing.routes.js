const express = require("express");
const {
    addBilling,updateBilling,deleteBilling,getAllBilling
  } = require("../controllers/billing.controllers");

  const { isAuth } = require("../utils/authentication");
const { isPrivilegedUser, isAdmin } = require("../utils/authorization");

const check=(req, res,next) => {
  // Access the authorization header in your route handler
  const authorizationHeader = req.headers.authorization;
  console.log("Authorization header",authorizationHeader);
  res.send(`Authorization header: ${authorizationHeader}`);
  return next();
}

const router = express.Router();
router.post("/billing",isAuth,isPrivilegedUser,addBilling);
//router.put("/updateBilling/:customerid/:productid/:billingdate",updateBilling);
router.put("/updateBilling/:_id",isAuth,isPrivilegedUser,updateBilling);
//router.delete("/deleteBilling/:customerid/:productid/:billingdate",deleteBilling);
router.delete("/deleteBilling/:_id",isAuth,isPrivilegedUser,deleteBilling);
//router.get("/billing",isAuth,isPrivilegedUser,getAllBilling);
//router.get("/billing/:billingid", getBill);
router.get('/billing',isAuth,isPrivilegedUser,getAllBilling);
  //router.get('/billing',isAuth,isPrivilegedUser);



module.exports = router;