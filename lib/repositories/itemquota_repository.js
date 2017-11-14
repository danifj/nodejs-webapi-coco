/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let ItemQuota = require('../domains/itemquota');

let ItemQuotaRepository = function(db){
  this.db = db;
};

ItemQuotaRepository.prototype = {
  addItemQuota: function (e, cb, errCb) {

      let db = this.db;
      let data = [e.itemQuota,e.value];
      let query = 'CALL AddItemQuota (?,?);';
      db.query(query, data, (err, result) => {
         if(err){
             errCb(err);
             console.log(err);
         }
         cb(result);
      });
  },

    addValueItemQuota: function (e, cb, errCb) {

        let db = this.db;
        let data = [e.itemQuota,e.entrieTypeId,e.value];
        let query = 'CALL AddValueItemQuota (?,?,?);';
        db.query(query, data, (err, result) => {
            if(err){
                errCb(err);
                console.log(err);
            }
            cb(result);
        });
    },

    setMonthlyStartChildrenQuotaItems: function (cb, errCb) {

        let db = this.db;
        let query = 'CALL SetMonthlyStartChildrenQuotaItems;';
        db.query(query, (err, result) => {
            if(err){
                errCb(err);
                console.log(err);
            }
            cb(result);
        });
    },

    setMonthlyStartValuesQuotaItems: function (cb, errCb) {

        let db = this.db;
        let query = 'CALL SetMonthlyStartValuesQuotaItems;';
        db.query(query, (err, result) => {
            if(err){
                errCb(err);
                console.log(err);
            }
            cb(result);
        });
    },

    setValueItemQuota: function (e, cb, errCb) {
        let db = this.db;
        let data = [e.id,e.value];
        let query = 'CALL SetValueItemQuota (?,?);';
        db.query(query, data, (err, result) => {
            if(err){
                errCb(err);
            }
            cb(result);
        });
    },

    setItemQuota: function (e, cb, errCb) {
        let db = this.db;
        let data = [e.id,e.itemQuota,e.value];
        let query = 'CALL SetItemQuota (?,?,?);';
        db.query(query, data, (err, result) => {
            if(err){
                errCb(err);
            }
            cb(result);
        });
    },

    getItemsQuota: function(cb, errCb){
        let db = this.db;
        let query = 'CALL GetItemsQuota;';
        db.query(query, (err, results, fields) => {
           if(err){
               errCb(err);
           }
           let itemsQuota = [];
           for(let i=0;i<results[0].length;i++){
               let e = results[0][i];
               let itemquota = new ItemQuota(e.ITEM_QUOTA_ID,e.ITEM_QUOTA,e.VALUE);
               itemsQuota.push(itemquota);
           }
           cb(itemsQuota);
        });
    },

    getItemQuota: function(reqItemQuota, cb, errCb){
        let db = this.db;
        let query = 'CALL GetItemQuota (?);'
        db.query(query, [reqItemQuota], (err, results, fields) => {
            if(err){
                errCb(err);
            }
            let result = results[0][0]

            if(!result){
                cb(`data with id = ${reqItemQuota} not found..`)
            }else{
                let itemquota = new ItemQuota(result.ITEM_QUOTA_ID,result.ITEM_QUOTA,result.VALUE);
                cb(itemquota);
            }
        });
    },

    getValuesItemsQuota: function(cb, errCb){
        let db = this.db;
        let query = 'CALL GetValuesItemsQuota;';
        db.query(query, (err, results, fields) => {
            if(err){
                errCb(err);
            }
            let itemsQuota = [];
            for(let i=0;i<results[0].length;i++){
                let e = results[0][i];
                let itemquota = new ItemQuota(e.ITEM_QUOTA_ID,e.ITEM_QUOTA,e.VALUE, e.ENTRIE_TYPE_ID, e.DATE);
                itemsQuota.push(itemquota);
            }
            cb(itemsQuota);
        });
    },

};

module.exports = ItemQuotaRepository;