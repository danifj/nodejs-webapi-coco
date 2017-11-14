/**
 * Created by Daniel on 5/7/2017.
 */
'use strict';

//let db = require('../config/mysql_config');
let ItemQuotaRepository = require('../repositories/itemquota_repository');
let ItemQuota = require('../domains/itemquota');

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

let addItemQuota = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }
    let data = req.body;
    let itemquota = new ItemQuota(null,data.itemQuota, data.value);
    let itemquotaRepo = new ItemQuotaRepository(connection);

    itemquotaRepo.addItemQuota(itemquota, result => {
        res.send('Add success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let addValueItemQuota = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }
    let data = req.body;
    let itemquota = new ItemQuota(null,data.itemQuota, data.value, data.entrieTypeId);
    let itemquotaRepo = new ItemQuotaRepository(connection);

    itemquotaRepo.addValueItemQuota(itemquota, result => {
        res.send('Add success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let setMonthlyStartChildrenQuotaItems = (req, res, next) => {

    handleDisconnect();

    let itemquotaRepo = new ItemQuotaRepository(connection);

    itemquotaRepo.setMonthlyStartChildrenQuotaItems (result => {
        res.send('Add success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let setValueItemQuota = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }
    if(!req.params){
        next('Parameter does not exist...');
    }
    let data = req.body;
    let id = req.params.id;
    let itemquota = new ItemQuota(id,null,data.value);
    let itemquotaRepo = new ItemQuotaRepository(connection);

    itemquotaRepo.setValueItemQuota(itemquota, result => {
        res.send('Update success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let setItemQuota = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }
    if(!req.params){
        next('Parameter does not exist...');
    }
    let data = req.body;
    let id = req.params.id;
    let itemquota = new ItemQuota(id, data.itemQuota,data.value);
    let itemquotaRepo = new ItemQuotaRepository(connection);

    itemquotaRepo.setItemQuota(itemquota, result => {
        res.send('Update success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let getItemsQuota = (req, res, next) => {

    handleDisconnect();

    let itemquotaRepo = new ItemQuotaRepository(connection);
    itemquotaRepo.getItemsQuota(result => {
        res.status(200).json({message: 'get all users', data: result});
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let getItemQuota = (req, res, next) => {

    handleDisconnect();

    if(!req.params){
        next('All fields are required...')
    }
    let reqItemQuota = req.params.id;
    let itemquotaRepo = new ItemQuotaRepository(connection);
    itemquotaRepo.getItemQuota(reqItemQuota, result => {
        res.status(200).json({message: 'get itemquota', data: result});
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let getValuesItemsQuota = (req, res, next) => {

    handleDisconnect();

    let itemquotaRepo = new ItemQuotaRepository(connection);
    itemquotaRepo.getValuesItemsQuota(result => {
        res.status(200).json({message: 'get all users', data: result});
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

module.exports = {
  addItemQuota: addItemQuota,
  addValueItemQuota: addValueItemQuota,
  setMonthlyStartChildrenQuotaItems: setMonthlyStartChildrenQuotaItems,
  setItemQuota: setItemQuota,
  setValueItemQuota: setValueItemQuota,
  getItemsQuota: getItemsQuota,
  getItemQuota: getItemQuota,
  getValuesItemsQuota: getValuesItemsQuota
};