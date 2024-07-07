const swaggerJsdoc = require('swagger-jsdoc');
const config = require('../config');

const options = {
  definition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: "Food Recipe Backend (Justina's Final Project)", // Title of the API
      version: '1.0.0', // Version of the API
      description: 'API documentation for Food Recipe App', // Description of the API
    },
    servers: [
      {
        url: config.serverURL, // URL of your development server
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            role: { type: 'string' },
          },
        },
        Recipe: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            ingredients: { type: 'array', items: { type: 'string' } },
            instructions: { type: 'string' },
            category: { type: 'string' },
            creator: { type: 'string' },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'JWT Authorization header using the Bearer scheme',
      },
    },
    security: [
      {
        JWT: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API routes files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
