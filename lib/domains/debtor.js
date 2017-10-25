/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let Debtor = function(id, firstName, lastName, age, birthdate, dni, diseases, allergies, phone1, phone2, phone3, street, streetNumber, floor, department, neighborhood, city, fatherFirstName, fatherLastName, fatherEmail, motherFirstName, motherLastName, motherEmail, roomId, turnId, authorizedPersons, summary){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.birthdate = birthdate;
    this.dni = dni;
    this.diseases = diseases;
    this.allergies = allergies;
    this.phone1 = phone1;
    this.phone2 = phone2;
    this.phone3 = phone3;
    this.street = street;
    this.streetNumber = streetNumber;
    this.floor = floor;
    this.department = department;
    this.neighborhood = neighborhood;
    this.city = city;
    this.fatherFirstName = fatherFirstName;
    this.fatherLastName = fatherLastName;
    this.fatherEmail = fatherEmail;
    this.motherFirstName = motherFirstName;
    this.motherLastName = motherLastName;
    this.motherEmail = motherEmail;
    this.roomId = roomId;
    this.turnId = turnId;
    this.authorizedPersons = authorizedPersons;
    this.summary = summary;
}

module.exports = Debtor;