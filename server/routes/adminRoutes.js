const router = require('express').Router();
const authorizeJwt = require('../auth');
const {
	signin,
	signup,
	createTeacher,
	createUser,
	deleteTeacher,
	teachers,
	users,
	deleteUser,
} = require('../controllers/adminController');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/create-teacher', authorizeJwt, createTeacher);
router.get('/teachers', authorizeJwt, teachers);
router.delete('/delete-teacher/:teacherId', authorizeJwt, deleteTeacher);
router.post('/create-user', authorizeJwt, createUser);
router.get('/users', authorizeJwt, users);
router.delete('/delete-user/:userId', authorizeJwt, deleteUser);

module.exports = router;
