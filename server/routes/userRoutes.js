const authorizeJwt = require('../auth/jwtAuth');
const authorizeRole = require('../auth/roleAuth');
const { signin, changePassword, refreshToken, logout } = require('../controllers/userController');

const router = require('express').Router();

router.post('/refresh-token', refreshToken);
router.post('/signin', signin);
router.post('/logout', logout);
router.put('/change-password', authorizeJwt, authorizeRole('user'), changePassword);

module.exports = router;
