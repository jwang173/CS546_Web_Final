const router = require('express').Router();

const {
  user
} = require('../data');

// GET todos/
router.get('/', async (req, res) => {
  res.json({
    "status": "yet to implement user slash"
  });
});


module.exports = router;
