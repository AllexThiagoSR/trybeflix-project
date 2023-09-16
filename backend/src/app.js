const express = require("express");

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.status(200).json({ message: 'OK' });
});

module.exports = app;