const jwt = require('jsonwebtoken');

const authorizeJwt = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split(' ')[1];
		jwt.verify(token, process.env.SECRET, (err, user) => {
			if (err) {
				return res.status(403).json({ msg: 'Invalid token', status: falses });
			}
			req.user = user;
			next();
		});
	} else {
		return res
			.status(401)
			.json({ msg: 'You are not authorize', status: false });
	}
};

module.exports = authorizeJwt;
