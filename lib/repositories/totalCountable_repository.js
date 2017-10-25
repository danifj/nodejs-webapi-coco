/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let TotalCountable = require('../domains/totalcountable');

let TotalCountableRepository = function(db){
  this.db = db;
};

TotalCountableRepository.prototype = {

    getTotalCountable: function(cb, errCb){
        let db = this.db;
        let query = 'CALL GetTotalCountable;';
        db.query(query, (err, results, fields) => {
           if(err){
               errCb(err);
           }
           let totals = [];
           for(let i=0;i<results[0].length;i++){
               let e = results[0][i];
               let totalCountable = new TotalCountable(e.DATE,e.NOMINAL_ACCOUNTS,e.SUMMARY);
               totals.push(totalCountable);
           }
           cb(totals);
        });
    }
};

module.exports = TotalCountableRepository;