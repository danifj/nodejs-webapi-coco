/**
 * Created by Daniel on 5/7/2017.
 */
'use strict';

//let db = require('../config/mysql_config');
let NonattendanceRepository = require('../repositories/nonattendance_repository');
let Nonattendance = require('../domains/nonattendance');


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

let saveNonattendance = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }
    let data = req.body;
    let nonattendance = new Nonattendance(data.childId,null,null,null,null,data.nonattendanceTypeId);
    let nonattendanceRepo = new NonattendanceRepository(connection);

    nonattendanceRepo.save(nonattendance, result => {
        res.send('Add success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let updateNonattendance = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }
    if(!req.params){
        next('Parameter does not exist...');
    }
    let data = req.body;
    let id = req.params.id;
    let nonattendance = new Nonattendance(id, data.childId, data.nonattendanceTypeId);
    let nonattendanceRepo = new NonattendanceRepository(connection);
    nonattendanceRepo.update(nonattendance, result => {
        res.send('Update success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let deleteNonattendance = (req, res, next) => {

    handleDisconnect();

  if(!req.params){
      next('Parameter does not exist...');
  }
  let id = req.params.id;
  let nonattendanceRepo = new NonattendanceRepository(connection);
    nonattendanceRepo.delete(id, result => {
      res.send('Data successfully deleted');
      next();
  }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let getNonattendance = (req, res, next) => {

    handleDisconnect();

  if(!req.params){
      next('Parameter does not exist...');
  }
    let id = req.params.id;
    let nonattendanceRepo = new NonattendanceRepository(connection);
    nonattendanceRepo.findOne(id, result => {
        res.status(200).json({message: 'get nonattendance', data: result});
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();

};

let getNonAttendancesByDate = (req, res, next) => {

    handleDisconnect();

    if(!req.query){
        next('All fields are required...')
    }

    let data = req.query;
    let nonattendanceRepo = new NonattendanceRepository(connection);
    nonattendanceRepo.getNonAttendancesByDate(data.date, result => {
        res.status(200).json({message: 'get all nonattendance', data: result});
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();

};


module.exports = {
  saveNonattendance: saveNonattendance,
  updateNonattendance: updateNonattendance,
  deleteNonattendance: deleteNonattendance,
  getNonattendance: getNonattendance,
  getNonAttendancesByDate: getNonAttendancesByDate
};