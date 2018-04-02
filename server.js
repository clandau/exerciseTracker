const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


require('./app/routes')(app, {});
app.listen(PORT, () => {
    console.log('listening on port', PORT);
}); 

// mongoose.connect(process.env.MONGODB_URI, (err) => {
//     if(err) console.log(err);
//     else console.log('connected to db');
// });
