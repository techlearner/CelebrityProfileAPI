/**
 * New node file
 */

var mysql = require('mysql');

var pool = mysql.createPool(
		{
			"host":'localhost',
			"port":'3306',
			"user": 'root',
			"password": '' ,
			"database":'celebrity'
			//debug: true
});

var conn = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};

exports.connection = conn;