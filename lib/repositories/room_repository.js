/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let Room = require('../domains/room');

let RoomRepository = function(db){
  this.db = db;
};

RoomRepository.prototype = {
  addRoom: function (e, cb, errCb) {

      let db = this.db;
      let data = [e.room,e.description];
      let query = 'CALL AddRoom (?,?);';
      db.query(query, data, (err, result) => {
         if(err){
             errCb(err);
             console.log(err);
         }
         cb(result);
      });
  },

    setRoom: function (e, cb, errCb) {
        let db = this.db;
        let data = [e.id, e.room, e.description];
        let query = 'CALL SetRoom (?,?,?);';
        db.query(query, data, (err, result) => {
            if(err){
                errCb(err);
            }
            cb(result);
        });
    },

    deleteRoom: function(id, cb, errCb){
        let db = this.db;
        let query = 'CALL DeleteRoom (?)';
        db.query(query, [id], (err, result) => {
            if(err){
                errCb(err);
            }
            cb(result);
        });
    },


    getRooms: function(cb, errCb){
        let db = this.db;
        let query = 'CALL GetRooms;';
        db.query(query, (err, results, fields) => {
           if(err){
               errCb(err);
           }
           let rooms = [];
           for(let i=0;i<results[0].length;i++){
               let e = results[0][i];
               let room = new Room(e.ROOM_ID,e.ROOM,e.DESCRIPTION);
               rooms.push(room);
           }
           cb(rooms);
        });
    }
};

module.exports = RoomRepository;