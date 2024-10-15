const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const tokenRoutes = require('./routes/tokenRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const teacherRoutes = require('./routes/teacherRoutes');

require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log('DB Connection successfull');
	})
	.catch((err) => {
		console.log(err.message);
	});

app.use('/token', tokenRoutes);
app.use('/admin', adminRoutes);
app.use('/teacher', teacherRoutes);
app.use('/user', userRoutes);

app.listen(process.env.PORT, () => {
	console.log(`Server listening at port ${process.env.PORT}`);
});
