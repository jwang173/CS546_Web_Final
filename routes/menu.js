const router = require('express').Router();

const {
  menu
} = require('../data');

// GET todos/
router.get('/', async (req, res) => {
  res.json({
    "status": "yet to implement menu slash"
  });
});


module.exports = router;
