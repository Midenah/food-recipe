# Food Recipe API

This is a simple Node.js and Express API for managing food recipes. The API allows users to create, read, update, and delete recipes. It also includes user authentication and authorization features, with roles for users and admins.

## Features

- User Authentication (Sign Up, Login)
- Role-based Access Control (User, Admin)
- Create, Read, Update, Delete (CRUD) operations for recipes
- Notify admins about recipe deletion requests via email
- Swagger documentation for API endpoints
- MongoDB for data storage

## Project Structure

The project is structured as follows:

food-recipe/  
├── api-docs/ `Houses the Swagger configuration for API documentation`  
├── config/ `Configuration files for the app`  
├── controllers/ `Request handlers for API routes`  
├── database/ `sContains DB Conection file`  
├── middlewares/ `Custom middleware for Express.js`  
├── models/ `Mongoose models for MongoDB`  
├── node_modules/ `Node.js modules`  
├── routes/ `API route definitions`  
├── services/ `Comprises functions that interacts with 3rd party services/libraries`  
├── src/ `This is where the previous backend implementation is`  
├── .env `Environment variables`  
├── .gitignore Git `ignore file`  
├── app.js `Entry point for the application`  
├── LICENSE `License information`  
├── package-lock.json `Automatically generated dependency tree for locking dependencies`  
├── package.json `Project metadata and dependencies`  
└── README.md `Project documentation`

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Nodemailer

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Midenah/food-recipe
   cd food-recipe
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```
   MONGO_URI=your_mongodb_connection_string
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   JWT_SECRET=your_jwt_secret
   ```

4. Run the application:
   ```bash
   npm start
   ```

### Usage

The API has the following endpoints:

- **Auth**

  - `POST /auth/signup` - Register a new user
  - `POST /auth/login` - Authenticate a user and get a token

- **Recipes**
  - `GET /recipes` - Get all recipes
  - `GET /recipes/:id` - Get a single recipe by ID
  - `POST /recipes` - Create a new recipe (Authenticated users only)
  - `PUT /recipes/:id` - Update a recipe (Creator or admin only)
  - `DELETE /recipes/:id` - Delete a recipe (Creator or admin only)
  - `POST /recipes/:id/inform-delete` - Inform an admin to delete a recipe (Any user)

### Middleware

- **Authentication** - Protect routes that require a logged-in user
- **Authorization** - Restrict access to certain routes based on user roles

### Models

- **User**

  - `name`: String
  - `email`: String
  - `password`: String
  - `role`: String (user or admin)

- **Recipe**
  - `recipe`: String
  - `ingredient`: String
  - `instructions`: String
  - `category`: String
  - `creator`: ObjectId (reference to User)

### Swagger Documentation

The API uses Swagger for documentation. To view the documentation:

1. Start the application.
2. Open your browser and go to `http://localhost:5000/api-docs`.

### MongoDB Setup

1. Go to [MongoDB](https://www.mongodb.com/) and sign up for a free account.
2. Create a new project and a new cluster.
3. Set up your database user and password.
4. Allow access from anywhere (0.0.0.0/0) in the IP Whitelist.
5. Get the connection string and add it to your `.env` file as `MONGO_URI`.

### Email Notifications

The application uses Nodemailer to send email notifications to admins. The `informDelete` controller sends an email to all users with the 'admin' role when a deletion request is made.

### Contributing

Feel free to submit issues and pull requests.

### License

This project is licensed under the MIT License.
