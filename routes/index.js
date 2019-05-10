const router = require('express').Router();

// Our Sub Routers
const menuRouter = require('./menu');
const userRouter = require('./user');
const orderRouter = require("./order");
const reviewRouter = require("./review");
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const signupRouter = require('./signup');


router.get("/", (req, res) => {
  res.render("home/home", { title: "Home" });
});


// Configure our main router to use these sub routes
router.use('/user', userRouter);
router.use('/menu', menuRouter);
router.use('/order', orderRouter);
router.use('/review', reviewRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/signup', signupRouter);


// Fallback if the route doesn't match any of our subrouters
router.use('*', (req, res) => {
  res
    .status(404)
    .json({
      error: 'Invalid Route',
      route: req.originalUrl,
      method: req.method
    });
});

// Export our main router so we can use it in app.js
module.exports = router;
