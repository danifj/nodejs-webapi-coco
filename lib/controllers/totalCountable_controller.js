/**
 * Created by Daniel on 5/7/2017.
 */
'use strict';

//let db = require('../config/mysql_config');
let TotalCountableRepository = require('../repositories/totalCountable_repository');
let TotalCountable = require('../domains/totalcountable');

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

let getTotalCountable = (req, res, next) => {

    handleDisconnect();

    let totalcountableRepo = new TotalCountableRepository(connection);
    totalcountableRepo.getTotalCountable(result => {
        res.status(200).json({message: 'get all Total Countable', data: result});
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};


module.exports = {
    getTotalCountable: getTotalCountable
};