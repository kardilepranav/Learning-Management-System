const authorizeJwt = require('../auth');
const { signin, changePassword } = require('../controllers/userController');

const router = require('express').Router();

router.post('/signin', signin);
router.put('/change-password', authorizeJwt, changePassword);

module.exports = router;
