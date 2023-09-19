const { Router } = require('express');
const { movieController } = require('../controllers');

const router = Router();

router.get('/', movieController.getAll)
router.post('/', movieController.createMovie)

module.exports = router;
