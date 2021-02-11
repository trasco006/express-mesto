const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userRoutes = require('./routes/router');
const bodyParser = require('body-parser');
const {PORT = 3000} = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
mongoose.connection.on('open', () => {
  console.log('DB connected!')
})
mongoose.connection.on('error', () => {
  console.log('error connecting DB!')
})


// app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '60258e30d7bc6a145ce71087'
  };
  next();
});
app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log('Ссылка на сервер: localhost:' + PORT);
});
