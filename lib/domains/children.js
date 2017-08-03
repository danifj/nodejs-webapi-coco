/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let Children = function(firstName, lastName, age, birthdate, dni, phone1, street, neighborhood, city, roomId, turnId, id){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.birthdate = birthdate;
    this.dni = dni;
    this.phone1 = phone1;
    this.street = street;
    this.neighborhood = neighborhood;
    this.city = city;
    this.roomId = roomId;
    this.turnId = turnId;
}

module.exports = Children;