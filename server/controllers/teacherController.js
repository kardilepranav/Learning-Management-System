const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Teacher = require('../model/teacherModel');
const User = require('../model/userModel');

module.exports.signin = async (req, res, next) => {
	const { username, password } = req.body;
	try {
		const teacher = await Teacher.findOne({ username });
		if (!teacher) {
			return res
				.status(404)
				.json({ msg: 'Invalid username or password', status: false });
		}

		const validPassword = bcrypt.compareSync(password, teacher.password);
		if (!validPassword) {
			return res
				.status(404)
				.json({ msg: 'Invalid username or password', status: false });
		}

		delete req.body.password;

		const token = jwt.sign({ username, role: 'teacher' }, process.env.SECRET, {
			expiresIn: '1h',
		});

		return res
			.status(200)
			.json({ msg: 'Signin successfully', token, status: true });
	} catch (err) {
		next(err);
	}
};


