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

    // users.getUserById('102');
  
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
