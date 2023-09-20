const { Router } = require('express');
const { movieController } = require('../controllers/index');
const { validateUpdate } = require('../middlewares/updateMovie.middleware');

const router = Router();

router.get('/', movieController.getAll);

router.post('/', movieController.createMovie);

router.get('/test', (_req, res) => res.status(200).json({ message: 'Tested' }));

router.get('/:id', movieController.getById);

router.put('/:id', validateUpdate, movieController.update);

router.delete('/:id', movieController.deleteMovie);

module.exports = router;
