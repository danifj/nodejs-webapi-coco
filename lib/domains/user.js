/**
 * Created by Daniel on 3/7/2017.
 */
'use strict';

let User = function(id, firstName, lastName, user, password){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.user = user;
    this.password = password;
}

module.exports = User;