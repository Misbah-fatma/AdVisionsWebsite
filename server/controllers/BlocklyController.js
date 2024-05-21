const mongoose = require('mongoose');
const Blockly = require('../model/Blockly.js'); // Assuming the model is defined in models/blockly.js

// Controller function to save Blockly code
exports.saveCode = async (req, res) => {
  const { userId, xml, generatedCode, output } = req.body;

  if (!userId || !xml || !generatedCode || !output) {
    return res.status(400).send('Missing required fields');
  }

  try {
    let codeEntry = await Blockly.findOne({ user: userId });
    if (codeEntry) {
      codeEntry.xml = xml;
      codeEntry.generatedCode = generatedCode;
      codeEntry.output = output;
    } else {
      codeEntry = new Blockly({ user: userId, xml, generatedCode, output });
    }

    await codeEntry.save();
    res.status(200).send('Code and output saved successfully');
  } catch (error) {
    console.error('Error saving code:', error);
    res.status(500).send('Error saving code');
  }
};

// Controller function to fetch Blockly code snippets for a user
exports.getUserFiles = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).send('User ID is required');
  }

  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send('Invalid user ID format');
  }

  try {
    const codes = await Blockly.find({ user: userId });
    if (codes.length === 0) {
      return res.status(404).send('No codes found for this user');
    }
    res.send(codes);
  } catch (error) {
    console.error('Error fetching codes:', error);
    res.status(500).send('Server error');
  }
};
