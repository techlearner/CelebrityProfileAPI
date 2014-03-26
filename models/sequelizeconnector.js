/**
 * New node file
 */

//dbname, username, password
var Sequelize = require('sequelize');

var sequelize = new Sequelize("test2", "root", "", {
	host:"127.0.0.1",
	port:3306,
	omitNull : true
	
	
});

exports.sequelizeconnector = sequelize;
