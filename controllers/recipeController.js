const Recipe = require('../models/Recipe');
const User = require('../models/User');
const sendMail = require('../services/mailer');

// Fetch all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('creator', 'name');
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error,
    });
  }
};

// Fetch a single recipe by ID
exports.getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id).populate('creator', 'name');
    if (!recipe)
      return res.status(404).json({
        message: 'Recipe not found',
      });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error,
    });
  }
};

// Create a new recipe
exports.createRecipe = async (req, res) => {
  const { recipe, ingredient, instructions, category } = req.body;

  try {
    const existingRecipe = await Recipe.findOne({
      recipe,
      creator: req.user._id,
    });
    if (existingRecipe) {
      return res.status(400).json({
        message: `You have already created a ${recipe} recipe before. Kindly create a different recipe.`,
      });
    }

    const newRecipe = new Recipe({
      recipe,
      ingredient,
      instructions: Array.isArray(instructions) ? instructions : [instructions],
      category,
      creator: req.user._id,
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error,
    });
  }
};

// Update a recipe
exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { recipe, ingredient, instructions, category } = req.body;

  try {
    const existingRecipe = await Recipe.findById(id);
    if (!existingRecipe)
      return res.status(404).json({
        message: 'Recipe not found',
      });
    if (existingRecipe.creator.toString() !== req.user._id && req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Unauthorized',
      });
    }
    existingRecipe.recipe = recipe || existingRecipe.recipe;
    existingRecipe.ingredient = ingredient || existingRecipe.ingredient;
    existingRecipe.instructions = instructions
      ? Array.isArray(instructions)
        ? instructions
        : [instructions]
      : existingRecipe.instructions;
    existingRecipe.category = category || existingRecipe.category;
    const updatedRecipe = await existingRecipe.save();
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error,
    });
  }
};

// Add extra instructions to a recipe
exports.addInstructions = async (req, res) => {
  const { id } = req.params;
  const { instructions } = req.body;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe)
      return res.status(404).json({
        message: 'Recipe not found',
      });
    if (recipe.creator.toString() !== req.user._id && req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Unauthorized',
      });
    }
    if (!Array.isArray(instructions)) {
      return res.status(400).json({
        message: 'Instructions should be an array of strings',
      });
    }
    recipe.instructions.push(...instructions);
    const updatedRecipe = await recipe.save();
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error,
    });
  }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe)
      return res.status(404).json({
        message: 'Recipe not found',
      });
    if (recipe.creator.toString() !== req.user._id && req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Unauthorized',
      });
    }
    await recipe.deleteOne({
      _id: id,
    });
    res.status(200).json({
      message: 'Recipe deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error,
    });
  }
};

// Inform admin to delete a recipe
exports.informDelete = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  try {
    const countAlphaNumeric = (str) => {
      return str.replace(/[^a-zA-Z0-9]/g, '').length;
    };

    if (!reason || countAlphaNumeric(reason) < 10) {
      return res.status(400).json({
        message: 'Reason must not be empty and should contain a couple of words',
      });
    }

    // Find all admin users
    const admins = await User.find({
      role: 'admin',
    });

    // Collect admin emails
    const adminEmails = admins.map((admin) => admin.email);

    // Send an email to each admin
    for (const email of adminEmails) {
      await sendMail(
        email,
        'Recipe Deletion Request',
        `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #ff6f61;">Recipe Deletion Request</h2>
            <p>User with email address: <strong>${req.user.email}</strong> is requesting the deletion of the recipe with ID: <strong>${id}</strong>.</p>
            <p><strong>Reason:</strong> ${reason}</p>
            <p>Thank you,<br/>The Team</p>
          </div>
        `
      );
    }

    res.status(200).json({
      message: 'Admins have been informed',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to inform admins',
      error: error.message,
    });
  }
};
