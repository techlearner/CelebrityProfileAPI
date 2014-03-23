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

exports.celebrity = function(req, res) {
	pool.getConnection(function(error, connection){
		if(error) {
			console.log("Get connection failed");
		}
		var sql = "select * from person";
		connection.query(sql, function(error, results){
			if(error) {
				console.log("Get persons failed");
			}
			console.log("results "+results);
			//res.writeHead(200);
			res.send(results);
			connection.release();
		});
	});
};