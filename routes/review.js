const router = require('express').Router();

const {
  review
} = require('../data');

// GET todos/
router.get('/', async (req, res) => {
  res.json({
    "status": "yet to implement review slash"
  });
});


module.exports = router;
