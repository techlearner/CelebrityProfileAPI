/**
 * New node file
 */
var person = require('../models/person');
var sequelizeconnector = require('../sequelizecontroller/sequelizeconnector');
var sequelizer = sequelizeconnector;
var sequelize = require('sequelize');

module.exports.update = function(req, res) {
	
	
	var person_id = req.body.person_id;
	var person_name = req.body.person_name;
	var person_category = req.body.person_category;
	var createdAt = new Date();
	var updatedAt = new Date();
	var Person = person(sequelizer, sequelize);
	console.log(person_id +" "+ person_category);
		
	Person.find({ where: {person_id: person_id} }).on('success', function(person) {
		  if (person) { // if the record exists in the db
			  person.updateAttributes({
				  person_name: person_name,
				  person_category : person_category,
				  updatedAt : updatedAt
		    }).success(function() {
		    	res.send("Success");
		    });
		  } else {
			  res.send("Not found ");
		  }
		});
	
};

module.exports.create = function(req, res) {
	
	var person_id = req.body.person_id;
	var person_name = req.body.person_name;
	var person_category = req.body.person_category;
	var createdAt = new Date();
	var updatedAt = new Date();
	var Person = person(sequelizer, sequelize);
	console.log(person_id +" "+ person_category);
	Person.create({
		person_id : person_id,
		person_name : person_name,
		person_category : person_category,
		createdAt : createdAt,
		updatedAt : updatedAt
	});
//	/res.writeHead(200, "success");
	res.send("success");
	
};

module.exports.readById = function(req, res) {
	var person_id = req.params.person_id;
	console.log("person_id "+person_id);
	var Person = person(sequelizer, sequelize);
	var response = Person.find({"where" : {person_id:person_id}}).success(function(person){
		res.send(person);
	});
	
};

module.exports.remove = function(req, res) {
	var person_id = req.params.person_id;
	console.log("person_id "+person_id);
	var Person = person(sequelizer, sequelize);
		
	Person.destroy({person_id : person_id}).on("success", function(u){
		res.send("Success");
	});
	
};