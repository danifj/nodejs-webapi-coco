/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let Children = require('../domains/children');

let ChildrenRepository = function(db){
  this.db = db;
};

ChildrenRepository.prototype = {
  save: function (e, cb, errCb) {

      let db = this.db;
      let data = {FIRST_NAME: e.firstName,
          LAST_NAME: e.lastName,
          AGE: e.age,
          BIRTHDATE: e.birthdate,
          DNI: e.dni,
          PHONE1: e.phone1,
          STREET: e.street,
          NEIGHBORHOOD: e.neighborhood,
          CITY: e.city,
          ROOM_ID: e.roomId,
          TURN_ID: e.turnId};
      let query = 'INSERT INTO childrens SET ?';
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
        let data = [e.firstName, e.lastName, e.age, e.birthdate, e.dni, e.phone1, e.street, e.neighborhood, e.city, e.roomId, e.turnId];
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
               let children = new Children(result.FIRST_NAME, result.LAST_NAME, result.AGE, result.BIRTHDATE, result.DNI, result.PHONE1, result.STREET, result.NEIGHBORHOOD, result.CITY, result.ROOM_ID, result.TURN_ID, result.CHILDREN_ID);
               cb(children);
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
           let childrens = [];
           for(let i=0;i<results.length;i++){
               let e = results[i];
               let children = new Children(e.FIRST_NAME, e.LAST_NAME, e.AGE, e.BIRTHDATE, e.DNI, e.PHONE1, e.STREET, e.NEIGHBORHOOD, e.CITY, e.ROOM_ID, e.TURN_ID,e.CHILDREN_ID);
               childrens.push(children);
           }
           cb(childrens);
        });
    }
};

module.exports = ChildrenRepository;