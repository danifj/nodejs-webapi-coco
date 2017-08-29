/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let Teacher = function(id, firstName, lastName, dni, cuit, phone1, phone2, email, street, streetNumber, floor, department, neighborhood, city, room, turn){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dni = dni;
    this.cuit = cuit;
    this.phone1 = phone1;
    this.phone2 = phone2;
    this.email = email;
    this.street = street;
    this.streetNumber = streetNumber;
    this.floor = floor;
    this.department = department;
    this.neighborhood = neighborhood;
    this.city = city;
    this.room = room;
    this.turn = turn;
}

module.exports = Teacher;