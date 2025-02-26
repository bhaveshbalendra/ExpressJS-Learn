const URL = require("../models/url");

async function handleHomeStaticRoute(req, res) {
  if (!req.user) return res.redirect("/login");
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("home", { urls: allUrls });
}

async function handleSignUpRoute(req, res) {
  return res.render("signup");
}

async function handleLoginRoute(req, res) {
  return res.render("login");
}
module.exports = {
  handleSignUpRoute,
  handleHomeStaticRoute,
  handleLoginRoute,
};
