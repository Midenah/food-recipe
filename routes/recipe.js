const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipe management endpoints
 */

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Get all recipes (requires authentication)
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of all recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       '500':
 *         description: Server error
 */
router.get('/', auth, recipeController.getAllRecipes);

/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     summary: Get a recipe by ID (requires authentication)
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the recipe to get
 *     responses:
 *       '200':
 *         description: Recipe found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       '404':
 *         description: Recipe not found
 *       '500':
 *         description: Server error
 */
router.get('/:id', auth, recipeController.getRecipeById);

/**
 * @swagger
 * /api/recipes:
 *   post:
 *     summary: Create a new recipe (requires authentication)
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipe:
 *                 type: string
 *               ingredient:
 *                 type: string
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *               category:
 *                 type: string
 *             example:
 *               recipe: Jollof Rice
 *               ingredient: Rice, tomato, spices
 *               instructions:
 *                 - Cook rice with tomato and spices
 *               category: Main Dish
 *     responses:
 *       '201':
 *         description: Recipe created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Server error
 */
router.post('/', auth, recipeController.createRecipe);

/**
 * @swagger
 * /api/recipes/{id}:
 *   put:
 *     summary: Update a recipe (requires authentication)
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the recipe to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipe:
 *                 type: string
 *               ingredient:
 *                 type: string
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *               category:
 *                 type: string
 *             example:
 *               recipe: Jollof Rice
 *               ingredient: Rice, tomato, spices
 *               instructions:
 *                 - Cook rice with tomato and spices
 *               category: Main Dish
 *     responses:
 *       '200':
 *         description: Recipe updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       '403':
 *         description: Unauthorized
 *       '404':
 *         description: Recipe not found
 *       '500':
 *         description: Server error
 */
router.put('/:id', auth, recipeController.updateRecipe);

/**
 * @swagger
 * /api/recipes/{id}/add-instructions:
 *   post:
 *     summary: Add extra instructions to a recipe (requires authentication)
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the recipe to add instructions to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               instructions:
 *                 - "Preheat oven to 350°F."
 *                 - "Mix ingredients thoroughly in a large bowl."
 *     responses:
 *       '200':
 *         description: Extra instructions added successfully
 *       '403':
 *         description: Unauthorized, user is not the creator nor an admin
 *       '404':
 *         description: Recipe not found
 *       '500':
 *         description: Server error
 */
router.post('/:id/add-instructions', auth, recipeController.addInstructions);

/**
 * @swagger
 * /api/recipes/{id}:
 *   delete:
 *     summary: Delete a recipe (requires authentication)
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the recipe to delete
 *     responses:
 *       '200':
 *         description: Recipe deleted successfully
 *       '403':
 *         description: Unauthorized, user is not the creator nor an admin
 *       '404':
 *         description: Recipe not found
 *       '500':
 *         description: Server error
 */
router.delete('/:id', auth, recipeController.deleteRecipe);

/**
 * @swagger
 * /api/recipes/{id}/inform-delete:
 *   post:
 *     summary: Inform admin to delete a recipe (requires authentication)
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the recipe to inform admin about
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *             example:
 *               reason: This recipe is inappropriate and should be removed
 *     responses:
 *       '200':
 *         description: Admins have been informed
 *       '400':
 *         description: Invalid request, reason must not be empty and should contain a couple of words
 *       '500':
 *         description: Failed to inform admins
 */
router.post('/:id/inform-delete', auth, recipeController.informDelete);

module.exports = router;
