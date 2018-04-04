const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
require('./app/routes/tracker_routes.js')(app);

app.use(express.static('public'));
//app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


require('./app/routes/tracker_routes.js')(app, {});
app.listen(PORT, () => {
    console.log('listening on port', PORT);
}); 

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if(err) console.log('cannot connect to database', err);
    else console.log('connected to db');
});
