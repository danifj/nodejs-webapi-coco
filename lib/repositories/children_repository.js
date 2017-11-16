/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let Child = require('../domains/children');
let AuthorizedPersons = require('../domains/authorizedpersons');

let ChildrenRepository = function(db){
  this.db = db;
};

ChildrenRepository.prototype = {
  save: function (e, cb, errCb) {
      let db = this.db;
      let data = [e.firstName,e.lastName,e.age,e.birthdate,e.dni,e.diseases,e.allergies,e.phone1,e.phone2,e.phone3,e.street,e.streetNumber,e.floor,e.department,e.neighborhood,e.city,e.fatherFirstName,e.fatherLastName,e.fatherEmail,e.motherFirstName,e.motherLastName,e.motherEmail,e.roomId,e.turnId,e.authorizedPersons, e.itemQuota1, e.itemQuota2, e.itemQuota3, e.itemQuota4, e.itemQuota5, e.itemQuota6, e.itemQuota7, e.itemQuota8];
      let query = 'CALL AddChild (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
      db.query(query, data, (err, result) => {
         if(err){
             errCb(err);
             console.log(err);
         }
         cb(result);
      });
  },

    setChild: function (e, cb, errCb) {
        let db = this.db;
        let data = [e.firstName,e.lastName,e.age,e.birthdate,e.dni,e.diseases,e.allergies,e.phone1,e.phone2,e.phone3,e.street,e.streetNumber,e.floor,e.department,e.neighborhood,e.city,e.fatherFirstName,e.fatherLastName,e.fatherEmail,e.motherFirstName,e.motherLastName,e.motherEmail,e.roomId,e.turnId,e.authorizedPersons, e.itemQuota1, e.itemQuota2, e.itemQuota3, e.itemQuota4, e.itemQuota5, e.itemQuota6, e.itemQuota7, e.itemQuota8, e.id];
        let query = 'CALL SetChild (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
        db.query(query, data, (err, result) => {
            if(err){
                errCb(err);
            }
            cb(result);
        });
    },

    setActiveChild: function (e, cb, errCb) {
        let db = this.db;
        let data = [e.active,e.id];
        console.log(data);
        let query = 'CALL SetActiveChild (?,?);';
        db.query(query, data, (err, result) => {
            if(err){
                console.log(err);
                errCb(err);
            }
            console.log(result);
            cb(result);
        });
    },

    setAuthorizedPersonsByChildId: function (e, cb, errCb) {
        let db = this.db;
        let data = [e.authorizedPersons,e.id];
        let query = 'CALL SetAuthorizedPersonsByChildId (?,?);';
        db.query(query, data, (err, result) => {
            if(err){
                errCb(err);
            }
            cb(result);
        });
    },

    deleteChildById: function(id, cb, errCb){
        let db = this.db;
        let query = 'CALL DeleteChildById (?);';
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
               let child = new Child(result.FIRST_NAME, result.LAST_NAME, result.AGE, result.BIRTHDATE, result.DNI, result.PHONE1, result.STREET, result.NEIGHBORHOOD, result.CITY, result.ROOM_ID, result.TURN_ID, result.CHILDREN_ID);
               cb(child);
           }
        });
    },

    getAuthorizedPersonsByChildId: function(id, cb, errCb){
        let db = this.db;
        let query = 'CALL GetAuthorizedPersonsByChildId (?);'
        db.query(query, [id], (err, results, fields) => {
            if(err){
                errCb(err);
            }
            let result = results[0][0];
            if(!result){
                cb(`data Authorized Person with Children id = ${id} not found..`)
            }else{
                let authorizedPersons = new AuthorizedPersons(result.FIRST_NAME,result.LAST_NAME,result.DNI,result.AUTHORIZED_PERSONS);
                cb(authorizedPersons);
            }
        });
    },

    getChildrenByRoomId: function(id, cb, errCb){
        let db = this.db;
        let query = 'CALL GetChildrenByRoomId (?);';
        db.query(query, [id], (err, results, fields) => {
            if(err){
                errCb(err);
            }
            let children = [];
            for(let i=0;i<results[0].length;i++){
                let e = results[0][i];
                let child = new Child(e.CHILD_ID,e.FIRST_NAME,e.LAST_NAME,e.AGE,e.BIRTHDATE,e.DNI,e.DISEASES,e.ALLERGIES,e.PHONE1,e.PHONE2,e.PHONE3,e.STREET,e.STREET_NUMBER,e.FLOOR,e.DEPARTMENT,e.NEIGHBORHOOD,e.CITY,e.FATHER_FIRST_NAME,e.FATHER_LAST_NAME,e.FATHER_EMAIL,e.MOTHER_FIRST_NAME,e.MOTHER_LAST_NAME,e.MOTHER_EMAIL,e.ROOM_ID,e.TURN_ID,e.AUTHORIZED_PERSONS,e.ITEM_QUOTA_1,e.ITEM_QUOTA_2,e.ITEM_QUOTA_3,e.ITEM_QUOTA_4,e.ITEM_QUOTA_5,e.ITEM_QUOTA_6,e.ITEM_QUOTA_7,e.ITEM_QUOTA_8,e.ACTIVE,e.ACTIVE_UPDATE_DATE);
                children.push(child);
            }
            cb(children);
        });
    },

    findAll: function(cb, errCb){
        let db = this.db;
        let query = 'CALL GetChildren;';
        db.query(query, (err, results, fields) => {
           if(err){
               errCb(err);
           }
           let children = [];
           for(let i=0;i<results[0].length;i++){
               let e = results[0][i];
               let child = new Child(e.CHILD_ID,e.FIRST_NAME,e.LAST_NAME,e.AGE,e.BIRTHDATE,e.DNI,e.DISEASES,e.ALLERGIES,e.PHONE1,e.PHONE2,e.PHONE3,e.STREET,e.STREET_NUMBER,e.FLOOR,e.DEPARTMENT,e.NEIGHBORHOOD,e.CITY,e.FATHER_FIRST_NAME,e.FATHER_LAST_NAME,e.FATHER_EMAIL,e.MOTHER_FIRST_NAME,e.MOTHER_LAST_NAME,e.MOTHER_EMAIL,e.ROOM_ID,e.TURN_ID,e.AUTHORIZED_PERSONS,e.ITEM_QUOTA_1,e.ITEM_QUOTA_2,e.ITEM_QUOTA_3,e.ITEM_QUOTA_4,e.ITEM_QUOTA_5,e.ITEM_QUOTA_6,e.ITEM_QUOTA_7,e.ITEM_QUOTA_8,e.ACTIVE,e.ACTIVE_UPDATE_DATE);
               children.push(child);
           }
           cb(children);
        });
    }
};

module.exports = ChildrenRepository;