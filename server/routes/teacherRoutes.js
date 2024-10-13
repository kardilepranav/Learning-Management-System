const router = require('express').Router();
const authorizeJwt = require('../auth');
const { signin, changePassowrd } = require('../controllers/teacherController');

router.post('/signin', signin);
router.put('/change-password', authorizeJwt, changePassowrd);

module.exports = router;