const express = require("express");
const router = express.Router();
const {
  handleHomeStaticRoute,
  handleSignUpRoute,
  handleLoginRoute,
} = require("../controllers/static");

router.get("/", handleHomeStaticRoute);
router.get("/signup", handleSignUpRoute);
router.get("/login", handleLoginRoute);
module.exports = router;
