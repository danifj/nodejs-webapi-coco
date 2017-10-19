/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let Diary = function(id, date, time, event, description){
    this.id = id;
    this.date = date;
    this.time = time;
    this.event = event;
    this.description = description;
}

module.exports = Diary;