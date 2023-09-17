const { Router } = require('express');
const { movieController } = require('../controllers/index');

const router = Router();

router.get('/test', (_req, res) => res.status(200).json({ message: 'Tested' }));

router.get('/:id', movieController.getById);

router.put('/:id', movieController.update);

module.exports = router;
