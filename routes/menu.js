const router = require('express').Router();

const {
  menu
} = require('../data');

// GET todos/
router.get('/', async (req, res) => {
  try{
    let foodList = await menu.getAll();
    res.status(200).json(foodList);
  } catch(e) {
    res.status(404).json({error:e});
  }
});

router.get('/:id', async (req, res) => {
  try {
    let food = await menu.getById(req.params.id);
    res.status(200).json(food);
  } catch(e) {
    res.status(404).json({error:e});
  }
})

router.post('/', async (req, res) => {
  try {
    let name = req.body.search;
    let result = await menu.getByName(name);
    res.status(200).json(result);
  } catch(e) {
    res.status(404).json({error:e});
  }
})

module.exports = router;
