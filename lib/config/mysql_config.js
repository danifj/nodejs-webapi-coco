'use strict';


let mysql = require('mysql');

var db_config = {
    host: 'siteground360.com',
    user: 'quinitip_nursery',
    password: '1nf1n1tyWebDev',
    database: 'quinitip_nurseryschool'
};

var connection;

module.exports = function (){

/*
let connection = mysql.createConnection({
    host: 'siteground360.com',
    user: 'quinitip_nursery',
    password: '1nf1n1tyWebDev',
    database: 'quinitip_nurseryschool'
});*/

this.handleDisconnect = function() {
    /*db.connect(function(err) {              // The server is either down
     if(err) {                                     // or restarting (takes a while sometimes).
     console.log('error when connecting to db:', err);
     setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
     }                                     // to avoid a hot loop, and to allow our node script to
     });                                     // process asynchronous requests in the meantime.
     // If you're also serving http, display a 503 error.
     db.on('error', function(err) {
     console.log('db error', err);
     if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
     handleDisconnect();                         // lost due to either server restart, or a
     } else {                                      // connnection idle timeout (the wait_timeout
     throw err;                                  // server variable configures this)
     }
     });*/
    connection.on('error', function(err) {
        if (!err.fatal) {
            return;
        }

        if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
            throw err;
        }

        console.log('Re-connecting lost connection: ' + err.stack);

        connection = mysql.createConnection(db_config);
        handleDisconnect(connection);
        connection.connect();
    });
};

this.disconnect = function (){
    connection.end();
};

/*
connection.connect(function(err){
    if(err){
        console.log('Error connecting to Db: ' + err);
        return;
    }
    console.log('Connection established: ' + connection.state);
});
*/

/*
var db_config = {
    host: 'siteground360.com',
    user: 'quinitip_nursery',
    password: '1nf1n1tyWebDev',
    database: 'quinitip_nurseryschool'
};

var connection;
*/


};