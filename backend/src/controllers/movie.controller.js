const { movieService } = require("../services");

const getById = async (req, res) => {
  const { status, data } = await movieService.getById(req.params.id);
  return res.status(status).json(data);
};

const update = async (req, res) => {
  const { status, data } = await movieService.update(req.params.id, req.body);
  return res.status(status).json(data);
};

const deleteMovie = async (req, res) => {
  const { status, data } = await movieService.deleteMovie(req.params.id);
  return res.status(status).json(data);
};

module.exports = { getById, update, deleteMovie };
