// controllers/itemController.js
const Item = require('../model/Subcategory');

exports.createItem = (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    status: req.body.status,
    subcategories: req.body.subcategories
  });

  newItem.save()
    .then(() => res.json('Item added!'))
    .catch(err => res.status(400).json('Error: ' + err));
};

exports.getItems = (req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
};
