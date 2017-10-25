/**
 * Created by Daniel on 5/7/2017.
 */
'use strict';

//let db = require('../config/mysql_config');
let DebtorRepository = require('../repositories/debtor_repository');
let Debtor = require('../domains/debtor');

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

let getDebtors = (req, res, next) => {

    handleDisconnect();

    let debtorRepo = new DebtorRepository(connection);
    debtorRepo.getDebtors(result => {
        res.status(200).json({message: 'get all debtors', data: result});
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();

};


module.exports = {
    getDebtors: getDebtors
};