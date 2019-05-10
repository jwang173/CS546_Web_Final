const express = require("express");
const router = express.Router();
const users = require("../data/user");
const auth = require("../middleware/auth")


// router.get("/login", (req, res) => {
//   if (req.cookies.name === 'AuthCookie') {
//       res.redirect("/user")
//   } 
//   else {
//       res.render("users/login", { title: "Login" });
//   }
// });

router.get("/signup", (req, res, next) => {
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