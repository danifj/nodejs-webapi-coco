/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let Nonattendance = function(childId, firstName, lastName, dni, nonattendanceType, nonattendanceTypeId, id){
    this.id = id;
    this.childId = childId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dni = dni;
    this.nonattendanceType = nonattendanceType;
    this.nonattendanceTypeId = nonattendanceTypeId;
}

module.exports = Nonattendance;