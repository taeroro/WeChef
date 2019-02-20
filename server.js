let express = require('express');
let mongoose = require('mongoose');
let body_parser = require('body-parser');
let bluebird = require('bluebird');
//let token = require('express-bearer-token');

require('dotenv').config();

mongoose.Promise = bluebird;

if(process.env.NODE_ENV === 'dev') {
    mongoose.connect(process.env.testDB_URI, { useNewUrlParser: true, useCreateIndex: true, });
} else if(process.env.NODE_ENV === 'prod') {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, });
} else {
    console.log("Environment vars not specified.");
}

let app = express();

app.use(body_parser.urlencoded({ extended: true, }));
app.use(body_parser.json());
//app.use(token());

let user_router = require('./app/routes/user_router');


app.get('/', (req, res) => {
    res.send('Wechef API');
});

app.use('/user', user_router);

app.listen(process.env.PORT || 8080);

module.exports = app;