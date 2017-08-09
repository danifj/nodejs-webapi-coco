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
let cashierController = require('./controllers/cashier_controller');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
    res.send('Nursery School');
});

app.post('/child', childrenController.saveChild); //For save
app.put('/child/:id', childrenController.updateChild); //For update
app.put('/child/authorizedpersons/:id', childrenController.setAuthorizedPersonsByChildId); //For update
app.delete('/child/:id', childrenController.deleteChild); //For delete
app.get('/child/:id', childrenController.getChild); //For get one children
app.get('/child/authorizedpersons/:id', childrenController.getAuthorizedPersonsByChildId); //For get one children
app.get('/children', childrenController.getChildren); //For get all children

app.post('/nonattendance', nonattendanceController.saveNonattendance); //For save
app.get('/nonattendance/bydate', nonattendanceController.getNonAttendancesByDate); //Get nonAttendance by date

app.post('/cashier', cashierController.addCashier); //For save cashier
app.get('/cashier/bydate', cashierController.getCashierByDate); //For get cashier

module.exports = app;