const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const helmet = require('helmet');
const userRoutes = require('./routes/router');
const registerValidation = require('./middlewares/validators/registration');
const loginValidation = require('./middlewares/validators/login');
const {login, createUser, getUser} = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler')
// const bcrypt = require('bcryptjs');
const {requestLogger, errorLogger} = require('./middlewares/logger');
const {PORT = 3000} = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connection.on('open', () => {
});
mongoose.connection.on('error', () => {
});

app.use(helmet());

app.use(bodyParser.json());
app.use(requestLogger);
app.use(cors());
app.post('/signin', loginValidation, login);
app.post('/signup', registerValidation, createUser);
app.use('/', auth, userRoutes);


// app.use(errorLogger);
app.use(errorHandler)
app.listen(PORT, () => {
});
