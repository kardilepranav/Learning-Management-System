const jwt = require('jsonwebtoken');
const {
	createAccessToken,
	createRefreshToken,
} = require('../auth/createTokens');

module.exports.refreshToken = async (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) {
		return res.status(404).json({ message: 'Unathorized', status: false });
	}

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({ message: 'Invalid token', status: false });
		}

		const accessToken = createAccessToken({ id: user.id, role: 'teacher' });
		return res.json({ accessToken });
	});
};
