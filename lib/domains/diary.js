/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let Diary = function(id, day, time, event, description){
    this.id = id;
    this.day = day;
    this.time = time;
    this.event = event;
    this.description = description;
}

module.exports = Diary;