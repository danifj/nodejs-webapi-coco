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
        let data = [e.childId, e.nonattendanceTypeId];
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
        let data = [e.childId, e.nonattendanceTypeId];
        let query = 'UPDATE children SET FIRST_NAME = ?, LAST_NAME = ?, AGE = ?, BIRTHDATE = ?, DNI = ?, PHONE1 = ?, STREET = ?, NEIGHBORHOOD = ?, CITY = ?, ROOM_ID = ?, TURN_ID = ?';
        db.query(query, data, (err, result) => {
            if(err){
                errCb(err);
            }
            cb(result);
        });
    },

    delete: function(id, cb, errCb){
        let db = this.db;
        let query = 'DELETE FROM children WHERE CHILD_ID = ?';
        db.query(query, [id], (err, result) => {
            if(err){
                errCb(err);
            }
            cb(result);
        });
    },

    findOne: function(id, cb, errCb){
        let db = this.db;
        let query = 'SELECT * FROM children WHERE CHILDREN_ID = ?'
        db.query(query, [id], (err, results, fields) => {
           if(err){
               errCb(err);
           }
           let result = results[0];

           if(!result){
               cb(`data with id = ${id} not found..`)
           }else{
               let nonattendance = new Nonattendance(result.CHILD_ID, result.NON_ATTENDANCE_TYPE_ID, result.NON_ATTENDANCE_ID);
               cb(nonattendance);
           }
        });
    },

    getNonAttendancesByDate: function(date, cb, errCb){
        let db = this.db;
        let query = 'CALL GetNonAttendancesByDate (?);';
        db.query(query, [date], (err, results, fields) => {
           if(err){
               errCb(err);
           }
           let nonattendances = [];
           for(let i=0;i<results[0].length;i++){
               let e = results[0][i];
               let nonattendance = new Nonattendance(e.CHILD_ID, e.FIRST_NAME, e.LAST_NAME, e.DNI, e.NON_ATTENDANCE_TYPE);
               nonattendances.push(nonattendance);
           }
           cb(nonattendances);
        });
    }
};

module.exports = NonattendanceRepository;