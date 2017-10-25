/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let Debtor = require('../domains/debtor');

let DebtorRepository = function(db){
  this.db = db;
};

DebtorRepository.prototype = {

    getDebtors: function(cb, errCb){
        let db = this.db;
        let query = 'CALL GetDebtors;';
        db.query(query, (err, results, fields) => {
           if(err){
               errCb(err);
           }
           let debtors = [];
           for(let i=0;i<results[0].length;i++){
               let e = results[0][i];
               let debtor = new Debtor(e.CHILD_ID,e.FIRST_NAME,e.LAST_NAME,e.AGE,e.BIRTHDATE,e.DNI,e.DISEASES,e.ALLERGIES,e.PHONE1,e.PHONE2,e.PHONE3,e.STREET,e.STREET_NUMBER,e.FLOOR,e.DEPARTMENT,e.NEIGHBORHOOD,e.CITY,e.FATHER_FIRST_NAME,e.FATHER_LAST_NAME,e.FATHER_EMAIL,e.MOTHER_FIRST_NAME,e.MOTHER_LAST_NAME,e.MOTHER_EMAIL,e.ROOM_ID,e.TURN_ID,e.AUTHORIZED_PERSONS,e.SUMMARY);
               debtors.push(debtor);
           }
           cb(debtors);
        });
    }
};

module.exports = DebtorRepository;