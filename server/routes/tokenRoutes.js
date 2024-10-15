const { refreshToken } = require('../controllers/tokenController');

const router = require('express').Router();

router.post('/refresh-token', refreshToken);

module.exports = router;