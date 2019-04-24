const router = require('express').Router();

const {
  order
} = require('../data');

// GET todos/
router.get('/', async (req, res) => {
  res.json({
    "status": "yet to implement order slash"
  });
});


module.exports = router;
