/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let Teacher = require('../domains/teacher');

let TeacherRepository = function(db){
  this.db = db;
};

TeacherRepository.prototype = {
  addTeacher: function (e, cb, errCb) {

      let db = this.db;
      let data = [e.firstName,e.lastName,e.dni,e.cuit,e.phone1,e.phone2,e.email,e.street,e.streetNumber,e.floor,e.department,e.neighborhood,e.city,e.room,e.turn];
      let query = 'CALL AddTeacher (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
      db.query(query, data, (err, result) => {
         if(err){
             errCb(err);
             console.log(err);
         }
         cb(result);
      });
  },

    setTeacher: function (e, cb, errCb) {
        let db = this.db;
        let data = [e.firstName,e.lastName,e.dni,e.cuit,e.phone1,e.phone2,e.email,e.street,e.streetNumber,e.floor,e.department,e.neighborhood,e.city,e.room,e.turn,e.id];
        let query = 'CALL SetTeacher (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
        db.query(query, data, (err, result) => {
            if(err){
                errCb(err);
            }
            cb(result);
        });
    },

    getTeachers: function(cb, errCb){
        let db = this.db;
        let query = 'CALL GetTeachers;';
        db.query(query, (err, results, fields) => {
           if(err){
               errCb(err);
           }
           let teachers = [];
           for(let i=0;i<results[0].length;i++){
               let e = results[0][i];
               let teacher = new Teacher(e.TEACHER_ID,e.FIRST_NAME,e.LAST_NAME,e.DNI,e.CUIT,e.PHONE1,e.PHONE2,e.EMAIL,e.STREET,e.STREET_NUMBER,e.FLOOR,e.DEPARTMENT,e.NEIGHBORHOOD,e.CITY,e.ROOM,e.TURN);
               teachers.push(teacher);
           }
           cb(teachers);
        });
    }
};

module.exports = TeacherRepository;