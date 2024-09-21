const router = require('express').Router();
const authorizeJwt = require('../auth');
const {
	signin,
	signup,
	createTeacher,
	createUser,
} = require('../controllers/adminController');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/create-teacher', authorizeJwt, createTeacher);
router.post('/create-user', authorizeJwt, createUser);

module.exports = router;
