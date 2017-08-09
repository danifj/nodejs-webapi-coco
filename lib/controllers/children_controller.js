/**
 * Created by Daniel on 5/7/2017.
 */
'use strict';

//let db = require('../config/mysql_config');
let ChildrenRepository = require('../repositories/children_repository');
let Child = require('../domains/children');
let AuthorizedPersons = require('../domains/authorizedpersons');


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

let saveChild = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }
    let data = req.body;
    let child = new Child(data.id, data.firstName, data.lastName, data.age, data.birthdate, data.diseases, data.allergies, data.dni, data.phone1, data.phone2, data.phone3, data.street, data.streetNumber, data.floor, data.department, data.neighborhood, data.city, data.fatherFirstName, data.fatherLastName, data.motherFirstName, data.motherLastName, data.roomId, data.turnId, data.authorizedPersons);
    let childrenRepo = new ChildrenRepository(connection);

    childrenRepo.save(child, result => {
        res.send('Add success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let updateChild = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }
    if(!req.params){
        next('Parameter does not exist...');
    }
    let data = req.body;
    let id = req.params.id;
    let child = new Child(id, data.firstName,data.lastName,data.age,data.birthdate,data.dni,data.diseases,data.allergies,data.phone1,data.phone2,data.phone3,data.street,data.streetNumber,data.floor,data.department,data.neighborhood,data.city,data.fatherFirstName,data.fatherLastName,data.motherFirstName,data.motherLastName,data.roomId,data.turnId,data.authorizedPersons);
    let childrenRepo = new ChildrenRepository(connection);

    childrenRepo.update(child, result => {
        res.send('Update success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};


let setAuthorizedPersonsByChildId = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }
    if(!req.params){
        next('Parameter does not exist...');
    }
    let data = req.body;
    let id = req.params.id;
    let child = new Child(id,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,data.authorizedPersons);
    let childrenRepo = new ChildrenRepository(connection);
    childrenRepo.setAuthorizedPersonsByChildId(child, result => {
        res.send('Update success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let deleteChild = (req, res, next) => {

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

let getChild = (req, res, next) => {

    handleDisconnect();

  if(!req.params){
      next('Parameter does not exist...');
  }
    let id = req.params.id;
    let childrenRepo = new ChildrenRepository(connection);
    childrenRepo.findOne(id, result => {
        res.status(200).json({message: 'get child', data: result});
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();

};

let getAuthorizedPersonsByChildId = (req, res, next) => {

    handleDisconnect();

    if(!req.params){
        next('Parameter does not exist...');
    }
    let id = req.params.id;
    let childrenRepo = new ChildrenRepository(connection);
    childrenRepo.getAuthorizedPersonsByChildId(id, result => {
        res.status(200).json({message: 'get Authorized Persons By ChildId', data: result});
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
  saveChild: saveChild,
  updateChild: updateChild,
  deleteChild: deleteChild,
  getChild: getChild,
  getAuthorizedPersonsByChildId: getAuthorizedPersonsByChildId,
  setAuthorizedPersonsByChildId: setAuthorizedPersonsByChildId,
  getChildren: getChildren
};