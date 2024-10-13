const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Teacher = require('../model/teacherModel');
const User = require('../model/userModel');

module.exports.signin = async (req, res) => {
	const { username, password } = req.body;
	try {
		const teacher = await Teacher.findOne({ username });
		if (!teacher) {
			return res
				.status(404)
				.json({ message: 'Invalid username or password', status: false });
		}

		const validPassword = bcrypt.compareSync(password, teacher.password);
		if (!validPassword) {
			return res
				.status(404)
				.json({ message: 'Invalid username or password', status: false });
		}

		delete req.body.password;

		const token = jwt.sign({ username, role: 'teacher' }, process.env.SECRET, {
			expiresIn: '1h',
		});

		return res
			.status(200)
			.json({ message: 'Signin successfully', token, status: true });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};

module.exports.changePassowrd = async (req, res) => {
	const { currentPassword, newPassword } = req.body;
	const username = req.user.username;
	try {
		const teacher = await Teacher.findOne({ username });
		if (!teacher) {
			return res.status(404).json({ message: 'Teacher not found', status: false });
		}

		const isMatch = bcrypt.compareSync(currentPassword, teacher.password);
		if (!isMatch) {
			return res
				.status(400)
				.json({ message: 'Incorrect current password', status: false });
		}

		if (currentPassword === newPassword) {
			return res
				.status(403)
				.json({
					message: 'Password should not be same as current password',
					status: false,
				});
		}
		delete req.body.currentPassword;
		const hashedPassword = bcrypt.hashSync(newPassword, 10);

		teacher.password = hashedPassword;
		await teacher.save();

		delete req.body.newPassword;

		return res
			.status(200)
			.json({ message: 'Password updated successfully', status: true });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};
