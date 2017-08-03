/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let Nonattendance = function(childrenId, nonattendanceTypeId, id){
    this.id = id;
    this.childrenId = childrenId;
    this.nonattendanceTypeId = nonattendanceTypeId;
}

module.exports = Nonattendance;