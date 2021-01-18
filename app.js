const express = require('express');
const { PORT = 3000 } = process.env;
const routes = require('./routes/router.js')
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(routes);
app.listen(PORT, );
