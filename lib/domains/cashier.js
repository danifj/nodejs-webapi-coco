/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let Cashier = function(id, childId, itemId, item, entrieTypeId, entrieType, amount, date){
    this.id = id;
    this.childId = childId;
    this.itemId = itemId;
    this.item = item;
    this.entrieTypeId = entrieTypeId;
    this.entrieType = entrieType;
    this.amount = amount;
    this.date = date;
}

module.exports = Cashier;