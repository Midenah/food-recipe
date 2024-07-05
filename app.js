const express = require('express');
const connectDB = require('./database/db');
const recipeRoutes = require('./routes/recipe');
const userRoutes = require('./routes/user');
const config = require('./config');
const swaggerUi = require('swagger-ui-express');
const specs = require('./api-docs/swagger');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Serve Swagger UI at '/api-docs' endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);

app.listen(config.port, () => {
  console.log(`Server running on ${config.serverURL}`);
});
