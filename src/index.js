const { recipeRouter } = require('./router/recipeRouter');
const express = require('express');
const app = new express();

app.use(express.json());

app.use('/', recipeRouter);

const port = 3000;
app.listen(port, function () {
  console.log(`Server is running on port http://localhost:${port}`);
});
