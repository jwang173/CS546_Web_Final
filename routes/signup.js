const router = require('express').Router();

const users = require("../data/user");
const auth = require("../middleware/auth")

const bcrypt = require('bcrypt');


router.get("/", (req, res, next) => {
    if (req.cookies.name === 'AuthCookie') {
      res.redirect("/user")
    } 
    else {
      res.render("users/signup", { title: "Create Account" });
    }
  });


router.post("/", async (req, res, next) => {
    let email = req.body.email;
    let name = req.body.name
    let password = req.body.password

    let nameCheck = /(?:[\w\s][^!@#$%^&*()?//><,.;:'"\{\}\[\]=+~`\-_|\\0-9]+)/
    let nc = name.match(nameCheck)
    console.log(nc)
    if (!name.match(nameCheck)) {
        res.status(401).render("users/signup", { title: "Create Account", message: "Name is not valid." })
    }

    let emailCheck = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!email.match(emailCheck)) {
        res.status(401).render("users/signup", { title: "Create Account", message: "Email address is not valid." })
    }

    let allUsers = await users.getAllUsers()
    for (user in allUsers) {
        if (user.email == email) {
            res.status(401).render("users/login", { title: "Log In", message: "You already have an account. Enter your account information above to log in." })
        }
    }
  
    if (email && name && password) {
        console.log(email)
        console.log(name)
        console.log(password)
        let saltRounds = 8
        const hash = await bcrypt.hash(password, saltRounds);
        console.log("hashed")
        let userId = await users.addUser(email, name, hash)
        console.log("added")
        res.redirect("/login")
    }
    else {
        res.status(401).render("users/signup", { title: "Sign Up", message: "You must fill out all fields." })
    }
    
});


module.exports = router;
