/**
 * Created by Daniel on 5/7/2017.
 */
'use strict';

//let db = require('../config/mysql_config');
let UserRepository = require('../repositories/user_repository');
let User = require('../domains/user');

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

let addUser = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }
    let data = req.body;
    let user = new User(null,data.firstName, data.lastName, data.user, data.password);
    let userRepo = new UserRepository(connection);

    userRepo.addUser(user, result => {
        res.send('Add success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let setUser = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }
    if(!req.params){
        next('Parameter does not exist...');
    }
    let data = req.body;
    let id = req.params.id;
    let user = new User(id, data.firstName,data.lastName,data.user,data.password);
    let userRepo = new UserRepository(connection);

    userRepo.setUser(user, result => {
        res.send('Update success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let getUsers = (req, res, next) => {

    handleDisconnect();

    let userRepo = new UserRepository(connection);
    userRepo.getUsers(result => {
        res.status(200).json({message: 'get all users', data: result});
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let getUser = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }
    let reqUser = req.body.user;
    let userRepo = new UserRepository(connection);
    userRepo.getUser(reqUser, result => {
        res.status(200).json({message: 'get user', data: result});
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

module.exports = {
  addUser: addUser,
  setUser: setUser,
  getUsers: getUsers,
  getUser: getUser
};