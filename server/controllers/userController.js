const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
	createAccessToken,
	createRefreshToken,
} = require('../auth/createTokens');
const User = require('../model/userModel');

module.exports.refreshToken = async (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) {
		return res.status(404).json({ message: 'Unathorized', status: false });
	}

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({ message: 'Invalid token', status: false });
		}

		const accessToken = createAccessToken({ id: user.id, role: 'user' });
		return res.json({ accessToken });
	});
};

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

		const accessToken = createAccessToken(user, 'user');
		const refreshToken = createRefreshToken(user, 'user');

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 1000,
		});

		delete req.body.password;

		return res
			.status(200)
			.json({ message: 'Signin successfully', accessToken, status: true });
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'server error', error, status: false });
	}
};

module.exports.changePassword = async (req, res) => {
	const { currentPassword, newPassword } = req.body;
	const username = req.user.username;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({ message: 'User not found', status: false });
		}

		const isMatch = bcrypt.compareSync(currentPassword, user.password);
		if (!isMatch) {
			return res
				.status(400)
				.json({ message: 'Incorrect current password', status: false });
		}

		if (currentPassword === newPassword) {
			return res.status(403).json({
				message: 'Password should not be same as current password',
				status: false,
			});
		}
		delete req.body.currentPassword;

		const hashedPassword = bcrypt.hashSync(newPassword, 10);
		user.password = hashedPassword;
		user.save();

		delete req.body.newPassword;

		return res
			.status(200)
			.json({ message: 'Password changed successfully', status: true });
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'server error', error, status: false });
	}
};
