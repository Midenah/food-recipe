const { admin } = require("../component/auth.js");
const fs = require("fs");
const path = require("path");

let recipes = [];

const filePath = path.join(__dirname, "../component/food-recipe.json");

fs.readFile(filePath, "utf-8", function (err, data) {
  try {
    if (data) {
      recipes = JSON.parse(data);
      return recipes;
    }
    throw new Error(`Èrror getting file data: ${err}`);
  } catch (err) {
    console.error(err);
  }
});

const adminUser = async (req, res, next) => {
  const { username, password, email } = req.body;
  const result = await admin.validateAsync({ username, password, email });
  // Authenticate user
  if (result) {
    res.status(200).send(recipes);
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
};

const addRecipe = (req, res, next) => {
  const addNew = req.body;
  recipes.push(addNew);
  // Authenticate user
  if (adminUser) {
    res.status(200).send(recipes);
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
};

const deleteRecipe = (req, res, next) => {
  const recipeId = req.query.id;

  if (recipeId) {
    recipes.find((recipe) => recipe.id === recipeId);
    return res.status(200).send("Deleted");
  } else {
    res.status(404).send("Not found");
  }
};
module.exports = { adminUser, addRecipe, deleteRecipe };
