/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let TotalCountable = function(date, nominalAccounts, summary){
    this.date = date;
    this.nominalAccounts = nominalAccounts;
    this.summary = summary;
}

module.exports = TotalCountable;