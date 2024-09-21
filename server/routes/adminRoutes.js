const router = require('express').Router();
const { signin, signup, createTeacher } = require('../controllers/adminController');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/create-teacher', createTeacher);

module.exports = router;