const express = require("express");
const indexRouter = require("./routes");

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.status(200).json({ message: 'OK' });
});

app.use(indexRouter);

module.exports = app;