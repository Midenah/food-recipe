// GUIDE 1
/**
 * JT, THIS IS A GUIDE ON WHATSOEVER UPDATES WOULD BE MADE TO THIS PROJECT | JT, ENSURE YOU FOLLOW THROUGH
 *
 * PS: All the updates I'll be making would be outside your '/src' directory..They would be in the root directory of the project, and I also deleted your empty '/food-recipe' directory
 *
 * 1 -> JT..As for the folder that you named 'router', standard practice is to name it: 'routes'
 * 2 -> We need to use an actual database like MongoDB or SQL (This is where all the recipes that are created OR updated would be)
 *    a) In PluralCode, we work with MongoDB..So, Creating an actual database:
 *       i) Go to https://www.mongodb.com/ and sign up for a free account.
 *       ii) Create a new project.
 *       iii) Create a new cluster within the project.
 *       iv) Set up your database user and password.
 *       v) Allow access from anywhere (0.0.0.0/0) in the IP Whitelist.
 *       vi) Get the connection string by clicking on the "Connect" button and selecting "Connect your application".
 *       vii) The connection string will look something like this:
 *           mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
 * 3 -> Create Mongoose models for the Recipe and User:
 *    - The Recipe model should include fields for id, recipe, ingredient, instructions, category, and a creator field that references the User model.
 *    - The User model should include fields for id, name, email, password, and role (which can be either 'user' or 'admin').
 * 4 -> Set up the following endpoints:
 *    - GET /recipes: Fetch all recipes.
 *    - GET /recipes/:id: Fetch a single recipe by its ID.
 *    - POST /recipes: Create a new recipe (only for logged-in users).
 *    - PUT /recipes/:id: Update a recipe (only for the creator or an admin).
 *    - DELETE /recipes/:id: Delete a recipe (only for the creator or an admin).
 *    - POST /recipes/:id/inform-delete: Inform an admin to delete a particular recipe that is not their own.
 * 5 -> Replace Joi validation with Mongoose validation.
 * 6 -> Standardize naming of route files, for example, rename 'authRouter.js' to 'auth.js'.
 * 7 -> While it’s okay to write all codes in the /src folder, it’s not mandatory. You can structure your project in a way that best suits you, but ensure consistency and readability.
 * 8 -> For connecting to MongoDB, you need a MongoDB connection string. Use a '.env' file to store your environment variables securely.
 *    - Example: MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/food-recipe?retryWrites=true&w=majority
 * 9 -> Use a tool like MongoDB Compass to view your database and collections in real-time.
 *    - Download MongoDB Compass from https://www.mongodb.com/products/compass.
 *    - Install and open the application.
 *    - Use your MongoDB connection string to connect to your database in MongoDB Compass.
 *    - You can now view and manage your collections and documents.
 * 10 -> Swagger Documentation:
 *    a) Install Swagger UI dependencies:
 *       npm install swagger-ui-express swagger-jsdoc
 *    b) Create a new file called `swagger.js` in the `/config` folder and add the following code:
 *
 *       const swaggerJsDoc = require('swagger-jsdoc');
 *       const swaggerUi = require('swagger-ui-express');
 *       const options = {
 *         definition: {
 *           openapi: '3.0.0',
 *           info: {
 *             title: 'Food Recipe API',
 *             version: '1.0.0',
 *             description: 'A simple Express Food Recipe API',
 *           },
 *           servers: [
 *             {
 *               url: 'http://localhost:5000',
 *             },
 *           ],
 *           components: {
 *             securitySchemes: {
 *               bearerAuth: {
 *                 type: 'http',
 *                 scheme: 'bearer',
 *                 bearerFormat: 'JWT',
 *               },
 *             },
 *           },
 *           securityDefinitions: {
 *             JWT: {
 *               type: 'apiKey',
 *               name: 'Authorization',
 *               in: 'header',
 *               description: 'JWT Authorization header using the Bearer scheme',
 *             },
 *           },
 *           security: [
 *             {
 *               JWT: [],
 *             },
 *           ],
 *         },
 *         apis: ['./routes/*.js'], // files containing annotations for the Swagger documentation
 *       };
 *       const specs = swaggerJsDoc(options);
 *       module.exports = (app) => {
 *         app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
 *       };
 *
 *    c) In your main server file (`server.js`), add the following lines to integrate Swagger:
 *
 *       const swaggerDocs = require('./config/swagger');
 *       swaggerDocs(app);
 *
 *    d) Document your endpoints with JSDoc comments. For example, in `recipe.js`:
 *
 *       /**
 *        * @swagger
 *        * tags:
 *        *   name: Recipes
 *        *   description: The recipes managing API
 *        * /
 *       /**
 *        * @swagger
 *        * /recipes:
 *        *   get:
 *        *     summary: Returns the list of all the recipes
 *        *     tags: [Recipes]
 *        *     responses:
 *        *       200:
 *        *         description: The list of the recipes
 *        *         content:
 *        *           application/json:
 *        *             schema:
 *        *               type: array
 *        *               items:
 *        *                 $ref: '#/components/schemas/Recipe'
 *        * /
 *       /**
 *        * @swagger
 *        * /recipes/{id}:
 *        *   delete:
 *        *     summary: Delete a recipe (requires authentication)
 *        *     tags: [Recipes]
 *        *     security:
 *        *       - bearerAuth: []
 *        *     parameters:
 *        *       - in: path
 *        *         name: id
 *        *         schema:
 *        *           type: string
 *        *         required: true
 *        *         description: The recipe ID
 *        *     responses:
 *        *       200:
 *        *         description: Recipe deleted successfully
 *        *       400:
 *        *         description: Invalid ID supplied
 *        *       404:
 *        *         description: Recipe not found
 *        *       500:
 *        *         description: Server error
 *        * /
 *
 *    e) Run your server and access Swagger documentation at `http://localhost:5000/api-docs`.
 *
 *    f) Use the Swagger UI to test your API endpoints by filling in the required parameters and clicking "Execute".
 *
 * 11 -> Setting up Email Service with Gmail:
 *    a) Enable "Less secure app access" in your Google account settings:
 *       i) Go to https://myaccount.google.com/security.
 *       ii) Scroll down to "Less secure app access" and turn it on.
 *       iii) Note: Enabling "Less secure app access" is not recommended for long-term use due to security concerns. You may want to look into using OAuth2 for a more secure method.
 *    b) Enable 2-Step Verification:
 *       i) Go to https://myaccount.google.com/security.
 *       ii) Under "Signing in to Google", select 2-Step Verification and follow the steps to set it up.
 *    c) Create an App Password:
 *       i) Go to https://myaccount.google.com/security.
 *       ii) Under "Signing in to Google", select "App passwords".
 *       iii) You may need to sign in again.
 *       iv) At the bottom, choose "Select app" and select the app you're using (you can name it "Mail").
 *       v) Select "Generate".
 *       vi) Copy the generated app password (16 characters) and use it as your `EMAIL_PASSWORD` in your `.env` file.
 *    d) Update your `.env` file:
 *       EMAIL_SERVICE=gmail
 *       EMAIL_USER=your-email@gmail.com
 *       EMAIL_PASSWORD=your-generated-app-password
 *
 * Ensure to follow these steps carefully to set up your email service with Gmail correctly.
 */

// GUIDE 2
/**
 * JT, EXTRA NPM PACKAGES THAT WERE INSTALLED (They were all installed as a normal dependency NOT dev dependency)
 *
 * mongoose (This library makes it easy for us connect with the MongoDB Database)
 * jsonwebtoken (This library help us create a long Base64url-encoded strings & this string help us to securely allow user access to the backend)
 * dotenv (This library helps us to gain access to the contents of our env file)
 * bcryptjs (This library helps us hash/encypt user password so that no one knows what the exact user passwords INCLUDING you as the developer)
 * nodemailer (This library helps us implement mailing functionality)
 */

// GUIDE 3
/**
 * JT, HERE'S YOUR CURRENT PROJECT STRUCTURE: Anyone with / (forward slash) is a folder, anyone without / is a file
  
  /api-docs
  /src
	/config
		config.js
  /controllers
    recipeController.js
    userController.js
	/database
		db.js
  /models
    Recipe.js
    User.js
  /middlewares
    auth.js
  /routes
    recipe.js
    user.js
  /services
    mailer.js
  .env
  .gitignore
  app.js
  LICENSE
  README.md

	PS: "start": "node src/index.js" and "dev": "nodemon src/index.js" have been removed from your package.json & replaced with "dev": "nodemon app.js" "dev": "nodemon app.js"
 */
