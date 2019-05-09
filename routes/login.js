const express = require("express");
const router = express.Router();
const users = require("../data/user");
const auth = require("../middleware/auth")


router.get("/login", (req, res) => {
  if (req.cookies.name === 'AuthCookie') {
    //   res.redirect("/user")
      console.log("Cookie is valid. Redirecting to /user")
  } 
  else {
      res.render("/login", { title: "Login" });
  }
});

module.exports = router;
