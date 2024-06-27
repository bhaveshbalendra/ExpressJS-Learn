const express = require("express");
const router = express.Router();
const { handleStaticRoute } = require("../controllers/url");

router.get("/", handleStaticRoute);
module.exports = router;
