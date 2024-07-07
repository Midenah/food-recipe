const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  recipe: {
    type: String,
    required: true,
  },
  ingredient: {
    type: String,
    required: true,
  },
  instructions: {
    type: [String], // JT, I used an array of strings
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
