/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let ItemQuota = function(id, itemQuota, value, entrieTypeId, date){
    this.id = id;
    this.itemQuota = itemQuota;
    this.value = value;
    this.entrieTypeId = entrieTypeId;
    this.date = date;
}

module.exports = ItemQuota;