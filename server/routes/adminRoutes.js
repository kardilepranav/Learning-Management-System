const router = require('express').Router();
const authorizeJwt = require('../auth/jwtAuth');
const authorizeRole = require('../auth/roleAuth');
const {
	signin,
	signup,
	createTeacher,
	createUser,
	deleteTeacher,
	teachers,
	users,
	deleteUser,
	findByTeacherId,
	findByUserId,
	changePassword,
	logout,
} = require('../controllers/adminController');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', logout);
router.put(
	'/change-password',
	authorizeJwt,
	authorizeRole('admin'),
	changePassword
);
router.post(
	'/create-teacher',
	authorizeJwt,
	authorizeRole('admin'),
	createTeacher
);
router.get('/teachers', authorizeJwt, authorizeRole('admin'), teachers);
router.get(
	'/teachers/:teacherId',
	authorizeJwt,
	authorizeRole('admin'),
	findByTeacherId
);
router.delete(
	'/delete-teacher/:teacherId',
	authorizeJwt,
	authorizeRole('admin'),
	deleteTeacher
);
router.post('/create-user', authorizeJwt, authorizeRole('admin'), createUser);
router.get('/users', authorizeJwt, authorizeRole('admin'), users);
router.get(
	'/users/:userId',
	authorizeJwt,
	authorizeRole('admin'),
	findByUserId
);
router.delete(
	'/delete-user/:userId',
	authorizeJwt,
	authorizeRole('admin'),
	deleteUser
);

module.exports = router;
