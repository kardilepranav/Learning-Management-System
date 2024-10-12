const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Username required'],
		min: [3, 'Minimun 3 characters required'],
		max: [20, 'Maximum 20 characters only'],
		unique: true,
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		min: [5, 'Minimum 5 characters required'],
		max: [50, 'Maximum 50 characters only'],
		unique: true,
		match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
	},
	password: {
		type: String,
		required: true,
		min: 8,
		max: 20,
	},
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
