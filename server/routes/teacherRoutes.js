const router = require('express').Router();
const authorizeJwt = require('../auth/jwtAuth');
const authorizeRole = require('../auth/roleAuth');
const { signin, changePassowrd, refreshToken, logout } = require('../controllers/teacherController');

router.post('/refresh-token', refreshToken);
router.post('/signin', signin);
router.post('/logout', logout);
router.put('/change-password', authorizeJwt, authorizeRole('teacher'), changePassowrd);

module.exports = router;