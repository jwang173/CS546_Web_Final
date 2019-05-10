const express = require("express");
const router = express.Router();
const users = require("../data/user");
const auth = require("../middleware/auth")


router.get("/", (req, res) => {
  if (req.cookies.name === 'AuthCookie') {
    res.redirect("/user")
    console.log("Cookie is valid. Redirecting to /user")
  } 
  else {
      res.render("users/login", { title: "Login" });
  }
});


router.post("/", (req, res, next) => {
  let email = req.body.email;
  let name = req.body.name
  let password = req.body.password
  let emailresult, passwordresult

  if (email && password) {
    emailresult = users.checkUsername(email);
    passwordresult = users.matchPassword(email, password)

    if (emailresult && passwordresult.status) {
        let { _id, email } = passwordresult.user
        res.cookie('name', 'AuthCookie')
        let user = {
            _id,
            email,
            name
        }
        req.session.user = user
        res.redirect("/")
    }
    else {
      res.status(401).render("users/login", { title: "Login", message: "The username or password provided is incorrect." })
    }
  }
  else {
    res.status(401).render("users/login", { title: "Login", message: "No username or password provided." })
  }
});


module.exports = router;
