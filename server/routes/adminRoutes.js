const router = require('express').Router();
const authorizeJwt = require('../auth');
const { signin, signup, createTeacher } = require('../controllers/adminController');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/create-teacher', authorizeJwt, createTeacher);

module.exports = router;