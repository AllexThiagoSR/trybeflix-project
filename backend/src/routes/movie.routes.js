const { Router } = require('express');

const router = Router();

router.get('/test', (req, res) => res.status(200).json({ message: 'Tested' }));

module.exports = router;
