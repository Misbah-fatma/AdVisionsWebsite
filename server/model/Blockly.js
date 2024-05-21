const mongoose = require('mongoose');

const BlocklySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  xml: {
    type: String,
    required: true
  },
  generatedCode: {
    type: String,
    required: true
  },
  output: {
    type: String,
    required: true
  }
});

const Blockly = mongoose.model('Blockly', BlocklySchema);

module.exports = Blockly;
