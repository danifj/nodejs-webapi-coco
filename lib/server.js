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
let roomController = require('./controllers/room_controller');
let teacherController = require('./controllers/teacher_controller');
let userController = require('./controllers/user_controller');
let diaryController = require('./controllers/diary_controller');
let itemQuotaController = require('./controllers/itemquota_controller');
let debtorController = require('./controllers/debtor_controller');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
    res.send('Nursery School');
});

app.post('/child', childrenController.saveChild); //For save
app.put('/child/:id', childrenController.setChild); //For update
app.put('/child/authorizedpersons/:id', childrenController.setAuthorizedPersonsByChildId); //For update
app.delete('/child/:id', childrenController.deleteChild); //For delete
app.get('/child/:id', childrenController.getChild); //For get one children
app.get('/child/authorizedpersons/:id', childrenController.getAuthorizedPersonsByChildId); //For get one children
app.get('/children', childrenController.getChildren); //For get all children
app.get('/children/room/:id', childrenController.getChildrenByRoomId); //For get all children

app.post('/room', roomController.addRoom); //For get all rooms
app.put('/room/:id', roomController.setRoom); //For get all rooms
app.get('/rooms', roomController.getRooms); //For get all rooms

app.post('/nonattendance', nonattendanceController.saveNonattendance); //For save
app.get('/nonattendance/bydate', nonattendanceController.getNonAttendancesByDate); //Get nonAttendance by date

app.post('/cashier', cashierController.addCashier); //For save cashier
app.get('/cashier/bydate', cashierController.getCashierByDate); //For get cashier<

app.post('/teacher', teacherController.addTeacher); //For save
app.put('/teacher/:id', teacherController.setTeacher); //For update
app.get('/teachers', teacherController.getTeachers); //For update

app.post('/user', userController.addUser); //For save
app.put('/user/:id', userController.setUser); //For update
app.get('/users', userController.getUsers); //For get
app.post('/user/login', userController.getUser); //For get

app.post('/diary', diaryController.addDiary); //For save
app.put('/diary/:id', diaryController.setDiary); //For update
app.delete('/diary/:id', diaryController.deleteDiary); //For delete
app.get('/diaries', diaryController.getDiaries); //For get
app.get('/diary/:id', diaryController.getDiary); //For get

app.post('/itemquota', itemQuotaController.addItemQuota); //For save
app.post('/itemquota/value', itemQuotaController.addValueItemQuota); //For save
app.put('/itemquota/value/:id', itemQuotaController.setValueItemQuota); //For update
app.get('/itemsquota/values', itemQuotaController.getValuesItemsQuota); //For save
app.put('/itemquota/:id', itemQuotaController.setItemQuota); //For update
app.get('/itemsquota', itemQuotaController.getItemsQuota); //For get
app.get('/itemquota/:id', itemQuotaController.getItemQuota); //For get

app.get('/debtors', debtorController.getDebtors); //For get

module.exports = app;
