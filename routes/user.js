const express = require("express");
const router = express.Router();
const users = require("../data/user");
const auth = require("../middleware/auth")


router.get("/login", (req, res) => {
  if (req.cookies.name === 'AuthCookie') {
      res.redirect("/user")
  } 
  else {
      res.render("users/login", { title: "Login" });
  }
});

router.get("/signup", log, (req, res, next) => {
  if (req.cookies.name === 'AuthCookie') {
    res.redirect("/user")
  } 
  else {
    res.render("users/signup", { title: "Create Account" });
  }
});

router.get("/user", auth, (req, res, next) => {
  if (req.cookies.name === 'AuthCookie') {
    let userData = req.session.user
    res.render("users/user", { user: userData, title: "Hi " + userData.name })
  } 
  else {
      res.render("users/login", { title: "Login" });
  }
});

router.get("/logout", log, (req, res, next) => {
  res.clearCookie('name')
  res.redirect("/")
});


router.post("/login", (req, res, next) => {
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

router.post("/signup", async (req, res, next) => {
  let email = req.body.email;
  let name = req.body.name
  let password = req.body.password

  if (!email || !name || !password) {
    throw "Missing information. Cannot create account.";
  }

  if (email == "" || name == "" || password == "") {
    throw "Cannot create account with empty data.";
  }

  let saltRounds = 8
  const hash = await bcrypt.hash(password, saltRounds);

  users.addUser(email, name, hash)

  res.redirect("/")
});

module.exports = router;