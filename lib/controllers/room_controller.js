/**
 * Created by Daniel on 5/7/2017.
 */
'use strict';

//let db = require('../config/mysql_config');
let RoomRepository = require('../repositories/room_repository');
let Room = require('../domains/room');

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

let addRoom = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }

    let data = req.body;
    let room = new Room(null, data.room, data.description);
    let roomRepo = new RoomRepository(connection);

    roomRepo.addRoom(room, result => {
        res.send('Add success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let setRoom = (req, res, next) => {

    handleDisconnect();

    if(!req.body){
        next('All fields are required...')
    }
    if(!req.params){
        next('Parameter does not exist...');
    }
    let data = req.body;
    let id = req.params.id;
    let room = new Room(id, data.room, data.description);
    let roomRepo = new RoomRepository(connection);

    roomRepo.setRoom(room, result => {
        res.send('Update success data');
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let deleteRoom = (req, res, next) => {

    handleDisconnect();

  if(!req.params){
      next('Parameter does not exist...');
  }
  let id = req.params.id;
  let roomRepo = new RoomRepository(connection);
  roomRepo.deleteRoom(id, result => {
      res.send('Data successfully deleted');
      next();
  }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

let getRooms = (req, res, next) => {

    handleDisconnect();

    let roomRepo = new RoomRepository(connection);
    roomRepo.getRooms(result => {
        res.status(200).json({message: 'get all rooms', data: result});
        next();
    }, err => {
        if(err){
            next(err);
        }
    });

    disconnect();
};

module.exports = {
  addRoom: addRoom,
  setRoom: setRoom,
  deleteRoom: deleteRoom,
  getRooms: getRooms
};