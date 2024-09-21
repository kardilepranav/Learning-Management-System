const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        min: 5,
        max: 50,
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