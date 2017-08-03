/**
 * Created by Daniel on 5/7/2017.
 */
'use strict';

//let db = require('../config/mysql_config');
let ChildrenRepository = require('../repositories/children_repository');
let Children = require('../domains/children');


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

let saveChildren = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }
    let data = req.body;
    let children = new Children(data.firstName, data.lastName, data.age, data.birthdate, data.dni, data.phone1, data.street, data.neighborhood, data.city, data.roomId, data.turnId);
    let childrenRepo = new ChildrenRepository(connection);

    childrenRepo.save(children, result => {
        res.send('Add success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let updateChildren = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }
    if(!req.params){
        next('Parameter does not exist...');
    }
    let data = req.body;
    let id = req.params.id;
    let children = new Children(id, data.firstName, data.lastName, data.age, data.birthdate, data.dni, data.phone1, data.street, data.neighborhood, data.city, data.roomId, data.turnId);
    let childrenRepo = new ChildrenRepository(connection);
    childrenRepo.update(children, result => {
        res.send('Update success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let deleteChildren = (req, res, next) => {

    handleDisconnect();

  if(!req.params){
      next('Parameter does not exist...');
  }
  let id = req.params.id;
  let childrenRepo = new ChildrenRepository(connection);
  childrenRepo.delete(id, result => {
      res.send('Data successfully deleted');
      next();
  }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let getChildren = (req, res, next) => {

    handleDisconnect();

  if(!req.params){
      next('Parameter does not exist...');
  }
    let id = req.params.id;
    let childrenRepo = new ChildrenRepository(connection);
    childrenRepo.findOne(id, result => {
        res.status(200).json({message: 'get children', data: result});
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();

};

let getChildrens = (req, res, next) => {

    handleDisconnect();

    let childrenRepo = new ChildrenRepository(connection);
    childrenRepo.findAll(result => {
        res.status(200).json({message: 'get all children', data: result});
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();

};


module.exports = {
  saveChildren: saveChildren,
  updateChildren: updateChildren,
  deleteChildren: deleteChildren,
  getChildren: getChildren,
  getChildrens: getChildrens
};