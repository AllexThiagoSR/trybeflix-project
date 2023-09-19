const { Router } = require('express');
const { movieController } = require('../controllers');

const router = Router();

router.get('/', movieController.getAll)

module.exports = router;
