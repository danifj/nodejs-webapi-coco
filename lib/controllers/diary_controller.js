/**
 * Created by Daniel on 5/7/2017.
 */
'use strict';

//let db = require('../config/mysql_config');
let DiaryRepository = require('../repositories/diary_repository');
let Diary = require('../domains/diary');

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

let addDiary = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }
    let data = req.body;
    let diary = new Diary(null,data.date, data.time, data.event, data.description);
    let diaryRepo = new DiaryRepository(connection);

    diaryRepo.addDiary(diary, result => {
        res.send('Add success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let setDiary = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }
    if(!req.params){
        next('Parameter does not exist...');
    }
    let data = req.body;
    let id = req.params.id;
    let diary = new Diary(id, data.date,data.time,data.event,data.description);
    let diaryRepo = new DiaryRepository(connection);

    diaryRepo.setDiary(diary, result => {
        res.send('Update success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let deleteDiary = (req, res, next) => {

    handleDisconnect();

    if(!req.params){
        next('Parameter does not exist...');
    }
    let id = req.params.id;
    let diaryRepo = new DiaryRepository(connection);
    diaryRepo.deleteDiary(id, result => {
        res.send('Data successfully deleted');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let getDiaries = (req, res, next) => {

    handleDisconnect();

    let diaryRepo = new DiaryRepository(connection);
    diaryRepo.getDiaries(result => {
        res.status(200).json({message: 'get all diaries', data: result});
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let getDiary = (req, res, next) => {

    handleDisconnect();

    if(!req.params){
        next('Parameter does not exist...');
    }
    let id = req.params.id;
    let diaryRepo = new DiaryRepository(connection);
    diaryRepo.getDiary(id, result => {
        res.status(200).json({message: 'get diary', data: result});
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

module.exports = {
    addDiary: addDiary,
    setDiary: setDiary,
    deleteDiary: deleteDiary,
    getDiaries: getDiaries,
    getDiary: getDiary
};