const authorizeJwt = require('../auth/jwtAuth');
const authorizeRole = require('../auth/roleAuth');
const { signin, changePassword } = require('../controllers/userController');

const router = require('express').Router();

router.post('/signin', signin);
router.put('/change-password', authorizeJwt, authorizeRole('user'), changePassword);

module.exports = router;
