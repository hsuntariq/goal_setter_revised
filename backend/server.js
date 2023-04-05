const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT;
const color = require('colors');
const cors = require('cors');
const errorHandler = require('./middlewares/errorMiddleware');
const connectDB = require('./config/connect');
const { protect } = require('./middlewares/authorizationMiddleware');

app.use(cors());
connectDB()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/user', require('./routes/userRoutes'))
app.use(errorHandler);
app.listen(port, () => console.log('server started on port ' + port));

