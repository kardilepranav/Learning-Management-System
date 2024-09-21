const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const teacherRoutes = require('./routes/teacherRoutes');

require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log('DB Connection successfull');
	})
	.catch((err) => {
		console.log(err.message);
	});

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/teacher', teacherRoutes);

app.listen(process.env.PORT, () => {
	console.log(`Server listening at port ${process.env.PORT}`);
});
