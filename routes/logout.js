const express = require("express");
const router = express.Router();
const users = require("../data/user");
const auth = require("../middleware/auth")


router.get("/logout", (req, res, next) => {
    res.clearCookie('name')
    res.redirect("/")
  });
    

module.exports = router;
