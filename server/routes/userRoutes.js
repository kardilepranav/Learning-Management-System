const { signin } = require('../controllers/userController');

const router = require('express').Router();

router.post('/signin', signin);


module.exports = router;
