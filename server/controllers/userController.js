const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

module.exports.signin = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res
				.status(404)
				.json({ message: 'Invalid username or password', status: false });
		}

		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			return res
				.status(404)
				.json({ message: 'Invalid username or password', status: false });
		}

		const token = jwt.sign({ username, role: 'user' }, process.env.SECRET, {
			expiresIn: '1h',
		});

		delete req.body.password;

		return res
			.status(200)
			.json({ message: 'Signin successfully', token, status: true });
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'server error', error, status: false });
	}
};
