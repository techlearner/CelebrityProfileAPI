/**
 * New node file
 */


var category = require('../models/category');
var sequelizeconnector = require('../sequelizecontroller/sequelizeconnector');
var sequelizer = sequelizeconnector;
var sequelize = require('sequelize');

module.exports.create = function(req, res) {
	var categoryName = req.body.category_name;
	console.log("categoryName "+categoryName);
	var Category = category(sequelizer, sequelize);
	var createdAt = new Date();
	var updatedAt = new Date();
	var model = Category.create({category_name:categoryName,
						createdAt : createdAt,
						updatedAt : updatedAt});
	model.on("success", function(){
		res.send("Success");
	});
	
	model.on("error", function() {
		res.send("Failure");
	});	
};

module.exports.update = function(req, res) {
	var categoryName = req.body.category_name;
	console.log("categoryName "+categoryName);
	var categoryId = req.params.category_id;
	var Category = category(sequelizer, sequelize);
	var updatedAt = new Date();
	
	Category.find({ where: {category_id: categoryId} }).on('success', function(category) {
		  if (category) {
			  category.updateAttributes({
				  category_name: categoryName,
				  updatedAt : updatedAt
		    }).success(function() {
		    	res.send("Success");
		    });
		  } else {
			  res.send("Not found ");
		  }
		});
	
};

module.exports.readById = function(req, res) {
	var category_id = req.params.category_id;
	console.log("category_id "+category_id);
	var Category = category(sequelizer, sequelize);
	var response = Category.find({"where" : {category_id : category_id}}).success(function(category){
		res.send(category);
	});
	
};


module.exports.remove = function(req, res) {
	var category_id = req.params.category_id;
	console.log("category_id "+category_id);
	var Category = category(sequelizer, sequelize);

	Category.destroy({category_id : category_id}).on("success", function(u){
		res.send("Success");
	});
	
};