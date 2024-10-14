const router = require('express').Router();
const authorizeJwt = require('../auth/jwtAuth');
const authorizeRole = require('../auth/roleAuth');
const { signin, changePassowrd } = require('../controllers/teacherController');

router.post('/signin', signin);
router.put('/change-password', authorizeJwt, authorizeRole('teacher'), changePassowrd);

module.exports = router;