const express = require("express");

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.status(200).json({ message: 'OK' });
});

app.listen(process.env.PORT || 3001, () => console.log('API is running'));