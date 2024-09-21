const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 3,
		max: 50,
	},
	email: {
		type: String,
		required: true,
		min: 5,
		max: 50,
		unique: true,
		match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
	},
	username: {
		type: String,
		required: true,
		min: 3,
		max: 20,
		unique: true,
	},
	password: {
		type: String,
		require: true,
		min: 8,
		max: 20,
	},
	subjects: [],
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;