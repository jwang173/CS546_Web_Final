function auth(req, res, next) {
    if (req.cookies.name === 'AuthCookie') {
        next()
    } 
    else {
        //res.status(403).render("users/error", { title: "Error: User Not Logged In" })
    }
}

module.exports = auth