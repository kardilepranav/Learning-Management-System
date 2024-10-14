const jwt = require('jsonwebtoken');

const createAccessToken = (user, role) => {
	return jwt.sign({ id: user._id, role }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '15m',
	});
};

const createRefreshToken = (user, role) => {
	return jwt.sign({ id: user._id, role }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '7d',
	});
};

module.exports = {
  createAccessToken,
  createRefreshToken,
}