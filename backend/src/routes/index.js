const movieRouter = require('./movie.routes');
const { Router } = require('express');

const indexRouter = Router();

indexRouter.use('/movies', movieRouter);

module.exports = indexRouter;
