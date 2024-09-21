const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 5,
		max: 40,
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
	selfPhoneNo: {
		type: String,
		required: true,
		min: 10,
		max: 10,
		unique: true,
	},
	parentsPhoneNo: {
		type: String,
		required: true,
		min: 10,
		max: 10,
		unique: true,
	},
	address: {
		type: String,
		required: true,
		min: 5,
		max: 40,
	},
	batch: {
		type: String,
		required: true,
		min: 3,
		max: 10,
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
