const { schema } = require('../component/auth.js');
const fs = require('fs');
const path = require('path');

let recipes = [];

const filePath = path.join(__dirname, '../component/food-recipe.json');

fs.readFile(filePath, 'utf-8', function (err, data) {
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

const regularUser = async (req, res, next) => {
  const { username, password } = req.body;
  const result = await schema.validateAsync({ username, password });
  // Authenticate user
  if (result) {
    res.status(200).send(recipes);
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = regularUser;
