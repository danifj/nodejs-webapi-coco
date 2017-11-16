/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let Children = function(id, firstName, lastName, age, birthdate, dni, diseases, allergies, phone1, phone2, phone3, street, streetNumber, floor, department, neighborhood, city, fatherFirstName, fatherLastName, fatherEmail, motherFirstName, motherLastName, motherEmail, roomId, turnId, authorizedPersons, itemQuota1, itemQuota2, itemQuota3, itemQuota4, itemQuota5, itemQuota6, itemQuota7, itemQuota8, active, activeUpdateDate){
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
    this.itemQuota1 = itemQuota1;
    this.itemQuota2 = itemQuota2;
    this.itemQuota3 = itemQuota3;
    this.itemQuota4 = itemQuota4;
    this.itemQuota5 = itemQuota5;
    this.itemQuota6 = itemQuota6;
    this.itemQuota7 = itemQuota7;
    this.itemQuota8 = itemQuota8;
    this.active = active;
    this.activeUpdateDate = activeUpdateDate;
}

module.exports = Children;