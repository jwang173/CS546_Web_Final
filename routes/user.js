const express = require("express");
const router = express.Router();
const users = require("../data/user");
const auth = require("../middleware/auth")


router.get("/", auth, (req, res, next) => {
  if (req.cookies.name === 'AuthCookie') {
    let userData = req.session.user
    res.render("users/user", { user: userData, title: "Hi " + userData.name })
  } 
  else {
      res.render("users/login", { title: "Login" });
      console.log("No cookie. Redirecting from users to login.")
  }
});

module.exports = router;