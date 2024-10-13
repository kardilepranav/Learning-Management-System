const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../model/adminModel');
const Teacher = require('../model/teacherModel');
const User = require('../model/userModel');

module.exports.signup = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const admin = await Admin.findOne({ username });
		if (admin) {
			return res
				.status(403)
				.json({ message: 'Admin already exists', status: false });
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
			.json({ message: 'Admin created successfully', token, status: true });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error, status: false });
	}
};

module.exports.signin = async (req, res) => {
	const { username, password } = req.body;
	try {
		const admin = await Admin.findOne({ username });
		if (!admin) {
			return res
				.status(401)
				.json({ message: 'Invalid username or password', status: false });
		}

		const validPassword = bcrypt.compareSync(password, admin.password);
		if (!validPassword) {
			return res
				.status(401)
				.json({ message: 'Invalid username or password', status: false });
		}

		const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET, {
			expiresIn: '1h',
		});

		return res
			.status(200)
			.json({ message: 'Signin succesfull', token, status: true });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error, status: false });
	}
};

module.exports.createTeacher = async (req, res) => {
	const { name, email, username, password, phoneNo, address, subjects } =
		req.body;
	try {
		const teacher = await Teacher.findOne({ username });
		if (teacher) {
			return res
				.status(403)
				.json({ message: 'Teacher already exists', status: false });
		}

		const hashedPassword = bcrypt.hashSync(password, 10);
		const obj = {
			name,
			email,
			username,
			password: hashedPassword,
			phoneNo,
			address,
			subjects,
		};

		const newTeacher = new Teacher(obj);
		delete req.body.password;
		newTeacher.save();

		return res
			.status(201)
			.json({ message: 'Teacher created successfully', status: true });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error, status: false });
	}
};

module.exports.teachers = async (req, res) => {
	const teachers = await Teacher.find();
	try {
		if (!teachers.length) {
			return res.status(404).json({ message: 'No Teachers found', status: false });
		}

		return res.status(200).json({ teachers, status: true });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error, status: false });
	}
};

module.exports.findByTeacherId = async (req, res) => {
	const id = req.params.teacherId;
	try {
		const teacher = await Teacher.findById(id);
		if (!teacher) {
			return res.status(404).json({ message: 'Teacher not found', status: false });
		}

		return res.status(200).json({ teacher, status: true });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error, status: false });
	}
};

module.exports.deleteTeacher = async (req, res) => {
	const id = req.params.teacherId;
	try {
		const teacher = await Teacher.findByIdAndDelete(id);
		if (!teacher) {
			return res.status(404).json({ message: 'Teacher not found', status: false });
		}

		return res
			.status(200)
			.json({ message: 'Teacher deleted successfully', status: true });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error, status: false });
	}
};

module.exports.createUser = async (req, res) => {
	const {
		name,
		email,
		username,
		password,
		selfPhoneNo,
		parentsPhoneNo,
		address,
		batch,
	} = req.body;

	try {
		const user = await User.findOne({ username });
		if (user) {
			return res
				.status(403)
				.json({ message: 'User already exists', status: false });
		}

		const hashedPassword = bcrypt.hashSync(password, 10);
		const obj = {
			name,
			email,
			username,
			password: hashedPassword,
			selfPhoneNo,
			parentsPhoneNo,
			address,
			batch,
		};
		const newUser = new User(obj);
		delete req.body.password;
		newUser.save();

		return res
			.status(201)
			.json({ message: 'User created successfully', status: true });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error, status: false });
	}
};

module.exports.users = async (req, res) => {
	try {
		const users = await User.find();
		if (!users.length) {
			return res.status(404).json({ message: 'Users not found', status: false });
		}

		return res.status(200).json({ users, status: true });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error, status: false });
	}
};

module.exports.findByUserId = async (req, res) => {
	const id = req.params.userId;
	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ message: 'user not found', status: false });
		}

		return res.status(200).json({ user, status: true });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error, status: false });
	}
};

module.exports.deleteUser = async (req, res) => {
	const id = req.params.userId;
	try {
		const user = await User.findByIdAndDelete(id);
		if (!user) {
			return res.status(404).json({ message: 'User not found', status: false });
		}

		return res
			.status(200)
			.json({ message: 'User deleted successfully', status: true });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error, status: false });
	}
};
