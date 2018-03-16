const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));


require('./app/routes')(app, {});
app.listen(port, () => {
    console.log('listening on port ', PORT);
})