/**
 * Created by Daniel on 5/7/2017.
 */
'use strict';

//let db = require('../config/mysql_config');
let CashierRepository = require('../repositories/cashier_repository');
let Cashier = require('../domains/cashier');

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

let addCashier = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }
    let data = req.body;
    let cashier = new Cashier(null, data.childId, data.itemId, null, data.entrieTypeId, null, data.amount, null);
    let cashierRepo = new CashierRepository(connection);

    cashierRepo.addCashier(cashier, result => {
        res.send('Add success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let setCashier = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }
    if(!req.params){
        next('Parameter does not exist...');
    }
    let data = req.body;
    let id = req.params.id;
    let cashier = new Cashier(id, data.firstName,data.lastName,data.age,data.birthdate,data.dni,data.diseases,data.allergies,data.phone1,data.phone2,data.phone3,data.street,data.streetNumber,data.floor,data.department,data.neighborhood,data.city,data.fatherFirstName,data.fatherLastName,data.motherFirstName,data.motherLastName,data.roomId,data.turnId,data.authorizedPersons);
    let cashierRepo = new CashierRepository(connection);

    cashierRepo.setCashier(cashier, result => {
        res.send('Update success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let deleteCashier = (req, res, next) => {

    handleDisconnect();

  if(!req.params){
      next('Parameter does not exist...');
  }
  let id = req.params.id;
  let cashierRepo = new CashierRepository(connection);
    cashierRepo.deleteCashier(id, result => {
      res.send('Data successfully deleted');
      next();
  }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let getCashierByDate = (req, res, next) => {

    handleDisconnect();

    if(!req.query){
        next('All fields are required...')
    }

    let data = req.query;

    let cashierRepo = new CashierRepository(connection);
    cashierRepo.getCashierByDate(data.date, result => {
        res.status(200).json({message: 'get all cashier', data: result});
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();

};


module.exports = {
    addCashier: addCashier,
    setCashier: setCashier,
    deleteCashier: deleteCashier,
    getCashierByDate: getCashierByDate
};