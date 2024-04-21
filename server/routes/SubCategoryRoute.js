const router = require('express').Router();
let Item = require('../model/Subcategory');

// Create new item
router.route('/').post((req, res) => {
  const newItem = new Item({
    name: req.body.name,
    status: req.body.status,
    subcategories: req.body.subcategories
  });

  newItem.save()
    .then(() => res.json('Item added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
