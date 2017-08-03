/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let Nonattendance = require('../domains/nonattendance');

let NonattendanceRepository = function(db){
  this.db = db;
};


NonattendanceRepository.prototype = {
  save: function (e, cb, errCb) {

        let db = this.db;
        let data = [e.childrenId, e.nonattendanceTypeId];
        let query = 'CALL AddNonAttendance (?,?);';
        db.query(query, data, (err, result) => {
            if(err){
                errCb(err);
                console.log(err);
            }
            cb(result);
    });
    },

    update: function (e, cb, errCb) {
        let db = this.db;
        let data = [e.childrenId, e.nonattendanceTypeId];
        let query = 'UPDATE childrens SET FIRST_NAME = ?, LAST_NAME = ?, AGE = ?, BIRTHDATE = ?, DNI = ?, PHONE1 = ?, STREET = ?, NEIGHBORHOOD = ?, CITY = ?, ROOM_ID = ?, TURN_ID = ?';
        db.query(query, data, (err, result) => {
            if(err){
                errCb(err);
            }
            cb(result);
        });
    },

    delete: function(id, cb, errCb){
        let db = this.db;
        let query = 'DELETE FROM childrens WHERE CHILDREN_ID = ?';
        db.query(query, [id], (err, result) => {
            if(err){
                errCb(err);
            }
            cb(result);
        });
    },

    findOne: function(id, cb, errCb){
        let db = this.db;
        let query = 'SELECT * FROM childrens WHERE CHILDREN_ID = ?'
        db.query(query, [id], (err, results, fields) => {
           if(err){
               errCb(err);
           }
           let result = results[0];

           if(!result){
               cb(`data with id = ${id} not found..`)
           }else{
               let nonattendance = new Nonattendance(result.CHILDREN_ID, result.NON_ATTENDANCE_TYPE_ID, result.NON_ATTENDANCE_ID);
               cb(nonattendance);
           }
        });
    },

    findAll: function(cb, errCb){
        let db = this.db;
        let query = 'SELECT * FROM childrens';
        db.query(query, (err, results, fields) => {
           if(err){
               errCb(err);
           }
           let nonattendance = [];
           for(let i=0;i<results.length;i++){
               let e = results[i];
               let nonattendance = new Nonattendance(e.FIRST_NAME, e.LAST_NAME, e.AGE, e.BIRTHDATE, e.DNI, e.PHONE1, e.STREET, e.NEIGHBORHOOD, e.CITY, e.ROOM_ID, e.TURN_ID,e.CHILDREN_ID);
               nonattendance.push(nonattendance);
           }
           cb(nonattendance);
        });
    }
};

module.exports = NonattendanceRepository;