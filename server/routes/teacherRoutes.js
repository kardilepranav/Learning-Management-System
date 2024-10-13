const router = require('express').Router();
const authorizeJwt = require('../auth');
const { signin } = require('../controllers/teacherController');

router.post('/signin', signin);

module.exports = router;