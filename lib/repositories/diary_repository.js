/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let Diary = require('../domains/diary');

let DiaryRepository = function(db){
  this.db = db;
};

DiaryRepository.prototype = {
  addDiary: function (e, cb, errCb) {

      let db = this.db;
      let data = [e.date,e.time,e.event,e.description];
      let query = 'CALL AddDiary (?,?,?,?);';
      db.query(query, data, (err, result) => {
         if(err){
             errCb(err);
             console.log(err);
         }
         cb(result);
      });
  },

    setDiary: function (e, cb, errCb) {
        let db = this.db;
        let data = [e.date,e.time,e.event,e.description,e.id];
        let query = 'CALL SetDiary (?,?,?,?,?);';
        db.query(query, data, (err, result) => {
            if(err){
                errCb(err);
            }
            cb(result);
        });
    },

    deleteDiary: function (id, cb, errCb) {
        let db = this.db;
        let query = 'CALL DeleteDiary (?);';
        db.query(query, [id], (err, result) => {
            if(err){
                errCb(err);
            }
            cb(result);
        });
    },

    getDiaries: function(cb, errCb){
        let db = this.db;
        let query = 'CALL GetDiaries;';
        db.query(query, (err, results, fields) => {
           if(err){
               errCb(err);
           }
           let diaries = [];
           for(let i=0;i<results[0].length;i++){
               let e = results[0][i];
               let diary = new Diary(e.DIARY_ID, e.DAY, e.TIME, e.EVENT, e.DESCRIPTION);
               diaries.push(diary);
           }
           cb(diaries);
        });
    },

    getDiary: function(id, cb, errCb){
        let db = this.db;
        let query = 'CALL GetDiary (?);'
        db.query(query, [id], (err, results, fields) => {
            if(err){
                errCb(err);
            }
            let result = results[0][0]

            if(!result){
                cb(`data with id = ${id} not found..`)
            }else{
                let diary = new Diary(result.DIARY_ID, result.DATE, result.TIME, result.EVENT, result.DESCRIPTION);
                cb(diary);
            }
        });
    },
};

module.exports = DiaryRepository;