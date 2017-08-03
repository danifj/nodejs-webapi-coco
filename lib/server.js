/**
 * Created by Daniel on 28/6/2017.
 */
'use strict';

let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');

let childrenController = require('./controllers/children_controller');
let nonattendanceController = require('./controllers/nonattendance_controller');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));



app.get('/', (req, res, next) => {
    res.send('hello caca');
});

app.post('/childrens', childrenController.saveChildren); //For save
app.put('/childrens/:id', childrenController.updateChildren); //For update
app.delete('/childrens/:id', childrenController.deleteChildren); //For delete
app.get('/childrens/:id', childrenController.getChildren); //For get one children
app.get('/childrens', childrenController.getChildrens); //For get all children

app.post('/nonattendance', nonattendanceController.saveNonattendance); //For save


module.exports = app;