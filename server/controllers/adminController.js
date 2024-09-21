const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../model/adminModel');

module.exports.signup = async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		const admin = await Admin.findOne({ username });
		if (admin) {
			return res
				.status(403)
				.json({ msg: 'Admin already exists', status: false });
        }
        
		const hashedPassword = bcrypt.hashSync(password, 10);
		const obj = {
			username,
			email,
			password: hashedPassword,
		};

		const newAdmin = new Admin(obj);
		delete req.body.password;
		newAdmin.save();

		const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET, {
			expiresIn: '1h',
		});

		return res
			.status(201)
			.json({ msg: 'Admin created successfully', token, status: true });
	} catch (err) {
		next(err);
	}
};

module.exports.signin = async (req, res, next) => {
	console.log('hello');
};

module.exports.createTeacher = async (req, res, next) => {
	console.log('hello');
};
