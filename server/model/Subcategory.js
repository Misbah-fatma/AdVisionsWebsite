const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  subcategories: [{ type: String, required: true }]
});

const Item = mongoose.model('SubCategory', itemSchema);

module.exports = Item;
