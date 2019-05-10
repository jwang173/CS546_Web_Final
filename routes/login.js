const express = require("express");
const router = express.Router();
const users = require("../data/user");
const auth = require("../middleware/auth")


router.get("/", async (req, res, next) => {
  if (req.cookies.name === 'AuthCookie') {
    console.log(req.session.user)
    const thisUser = await users.getUserById(req.session.user._id)
    res.redirect({ user: thisUser }, "/user")
  } 
  else {
    res.render("users/login", { title: "Create Account" });
  }
});


router.post("/", async (req, res, next) => {
  let email = req.body.email;
  let name = req.body.name
  let password = req.body.password
  let emailresult, passwordresult

  if (email && password) {
    emailresult = await users.checkUsername(email);
    passwordresult = await users.matchPassword(email, password)

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
