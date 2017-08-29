/**
 * Created by Daniel on 5/7/2017.
 */
'use strict';

//let db = require('../config/mysql_config');
let TeacherRepository = require('../repositories/teacher_repository');
let Teacher = require('../domains/teacher');

let mysql = require('mysql');

var db_config = {
    host: 'siteground360.com',
    user: 'quinitip_nursery',
    password: '1nf1n1tyWebDev',
    database: 'quinitip_nurseryschool'
};

var connection;

function handleDisconnect() {

    connection = mysql.createConnection(db_config);
    connection.connect();

};

function disconnect(){
    connection.end();
};

let addTeacher = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }
    let data = req.body;
    let teacher = new Teacher(null,data.firstName, data.lastName, data.dni, data.cuit, data.phone1, data.phone2, data.email, data.street, data.streetNumber, data.floor, data.department, data.neighborhood, data.city, data.room, data.turn);
    let teacherRepo = new TeacherRepository(connection);

    teacherRepo.addTeacher(teacher, result => {
        res.send('Add success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let setTeacher = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }
    if(!req.params){
        next('Parameter does not exist...');
    }
    let data = req.body;
    let id = req.params.id;
    let teacher = new Teacher(id, data.firstName,data.lastName,data.dni,data.cuit,data.phone1,data.phone2,data.street,data.streetNumber,data.floor,data.department,data.neighborhood,data.city,data.room,data.turn);
    let teacherRepo = new TeacherRepository(connection);

    teacherRepo.setTeacher(teacher, result => {
        res.send('Update success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let getTeachers = (req, res, next) => {

    handleDisconnect();

    let teacherRepo = new TeacherRepository(connection);
    teacherRepo.getTeachers(result => {
        res.status(200).json({message: 'get all teachers', data: result});
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();

};


module.exports = {
  addTeacher: addTeacher,
  setTeacher: setTeacher,
  getTeachers: getTeachers
};