const express = require('express');
const path = require('path')
const { PORT = 3000 } = process.env;
const routes = require('./routes/router.js')
const app = express();

app.use(express.static(path.join('static')));
app.use(routes);
app.listen(PORT, );
