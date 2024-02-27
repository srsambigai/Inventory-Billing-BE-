const express = require("express");

const router = express.Router();

router.get("/users", () => {});

router.get("/users/:userId", () => {});

module.exports = router;
