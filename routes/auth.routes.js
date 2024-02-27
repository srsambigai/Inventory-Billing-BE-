const express = require("express");
const {
  signup,
  signin,
  signout,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controllers");

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/signout", signout);

router.post("/forgotPassword", forgotPassword);

router.post("/resetPassword", resetPassword);

module.exports = router;