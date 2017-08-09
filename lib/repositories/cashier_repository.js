/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let Cashier = require('../domains/cashier');

let CashierRepository = function(db){
  this.db = db;
};

CashierRepository.prototype = {
    addCashier: function (e, cb, errCb) {

      let db = this.db;
      let data = [e.childId, e.itemId, e.entrieTypeId, e.amount];
      let query = 'CALL addCashier (?,?,?,?);';
      db.query(query, data, (err, result) => {
         if(err){
             errCb(err);
             console.log(err);
         }
         cb(result);
      });
  },

    setCashier: function (e, cb, errCb) {
        let db = this.db;
        let data = [e.authorizedPersons,e.id];
        let query = 'CALL setCashier (?,?);';
        db.query(query, data, (err, result) => {
            if(err){
                errCb(err);
            }
            cb(result);
        });
    },

    deleteCashier: function(id, cb, errCb){
        let db = this.db;
        let query = 'DELETE FROM childrens WHERE CHILDREN_ID = ?';
        db.query(query, [id], (err, result) => {
            if(err){
                errCb(err);
            }
            cb(result);
        });
    },

    getCashierByDate: function(date, cb, errCb){
        let db = this.db;
        let query = 'CALL GetCashierByDate (?);';
        db.query(query, [date], (err, results, fields) => {
            if(err){
                errCb(err);
            }
            let cashierItems = [];
            for(let i=0;i<results[0].length;i++){
                let e = results[0][i];
                let cashier = new Cashier(e.CASHIER_ID, e.CHILD_ID, null, e.ITEM, null, e.ENTRIE_TYPE, e.AMOUNT, e.DATE);
                cashierItems.push(cashier);
            }
            cb(cashierItems);
        });
    }
};

module.exports = CashierRepository;