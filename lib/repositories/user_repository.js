/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let User = require('../domains/user');

let UserRepository = function(db){
  this.db = db;
};

UserRepository.prototype = {
  addUser: function (e, cb, errCb) {

      let db = this.db;
      let data = [e.firstName,e.lastName,e.user,e.password];
      let query = 'CALL AddUser (?,?,?,?);';
      db.query(query, data, (err, result) => {
         if(err){
             errCb(err);
             console.log(err);
         }
         cb(result);
      });
  },

    setUser: function (e, cb, errCb) {
        let db = this.db;
        let data = [e.id,e.firstName,e.lastName,e.user,e.password];
        let query = 'CALL SetUser (?,?,?,?,?);';
        db.query(query, data, (err, result) => {
            if(err){
                errCb(err);
            }
            cb(result);
        });
    },

    getUsers: function(cb, errCb){
        let db = this.db;
        let query = 'CALL GetUsers;';
        db.query(query, (err, results, fields) => {
           if(err){
               errCb(err);
           }
           let users = [];
           for(let i=0;i<results[0].length;i++){
               let e = results[0][i];
               let user = new User(e.USER_ID,e.FIRST_NAME,e.LAST_NAME,e.USER,e.PASSWORD);
               users.push(user);
           }
           cb(users);
        });
    },

    getUser: function(reqUser, cb, errCb){
        let db = this.db;
        let query = 'CALL GetUser (?);'
        db.query(query, [reqUser], (err, results, fields) => {
            if(err){
                errCb(err);
            }
            let result = results[0][0]

            if(!result){
                cb(`data with id = ${reqUser} not found..`)
            }else{
                let user = new User(result.USER_ID,result.FIRST_NAME, result.LAST_NAME, result.USER, result.PASSWORD);
                cb(user);
            }
        });
    },
};

module.exports = UserRepository;