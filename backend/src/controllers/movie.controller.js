const { movieService } = require("../services");

const getById = async (req, res) => {
  const { status, data } = await movieService.getById(req.params.id);
  return res.status(status).json(data);
};

module.exports = { getById };
