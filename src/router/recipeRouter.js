const express = require ("express");
const regularUser = require ("../controller/regularPath.js");
const { adminUser, addRecipe, deleteRecipe} = require("../controller/adminPath.js");

const router = express.Router();

router.get("/foodrecipe", regularUser);
router.get("/adminrecipe", adminUser);
router.post("/adminrecipe", addRecipe)
router.delete("/adminrecipe", deleteRecipe)

module.exports = { recipeRouter: router }; 