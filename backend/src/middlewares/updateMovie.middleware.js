const Joi = require('joi');

const name = Joi.string().min(2).required();

const id = Joi.number().integer().min(1).required();

const releaseYear = Joi.number().integer().min(1800).max(9999).required();

const updateSchema = Joi.object({
  name,
  releaseYear,
  directorId: id,
  genreId: id,
});

const validateUpdate = (req, res, next) => {
  const { error } = updateSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  return next();
};

module.exports = { validateUpdate };
