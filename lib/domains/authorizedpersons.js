/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let AuthorizedPersons = function(firstName, lastName, dni, authorizedPersons){
    this.firstName = firstName;
    this.lastName = lastName;
    this.dni = dni;
    this.authorizedPersons = authorizedPersons;
}

module.exports = AuthorizedPersons;