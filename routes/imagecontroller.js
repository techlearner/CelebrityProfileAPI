/**
 * New node file
 */

var image = require('../models/image');
var sequelizeconnector = require('../sequelizecontroller/sequelizeconnector');
var sequelizer = sequelizeconnector;
var sequelize = require('sequelize');


module.exports.update = function(req, res) {
	
	var image_url = req.body.image_url;
	var image_thumb_url = req.body.video_thumb_url;
	var person_id = req.body.person_id;
	
	var image_id = req.body.image_id;
	var Image = image(sequelizer, sequelize);
	var createdAt = new Date();
	var updatedAt = new Date();
	
	Image.find({ where: {video_id : video_id} }).on('success', function(image) {
		  if (image) {
			  image.updateAttributes({
				  image_url : image_url,
				  image_thumb_url : image_thumb_url,
				  person_id : person_id,
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
	
	var image_url = req.body.image_url;
	var image_thumb_url = req.body.video_thumb_url;
	var person_id = req.body.person_id;
	
	var image_id = req.body.image_id;
	var Image = image(sequelizer, sequelize);
	var createdAt = new Date();
	var updatedAt = new Date();
	
	Image.create({
		image_id : image_id,
		image_url : image_url,
		image_thumb_url : image_thumb_url,
		person_id : person_id ,
		createdAt : createdAt,
		updatedAt : updatedAt
	});
	res.writeHead(200, "success");
	res.send("success");
	
};

module.exports.readById = function(req, res) {
	
	var image_id = req.params.image_id;
	console.log("Image Id "+image_id);
	var Image = image(sequelizer, sequelize);
	Image.find({"where" : {image_id:image_id}}).success(function(image){
		res.send(image);
	});
	
};

module.exports.remove = function(req, res) {
	var image_id = req.params.image_id;
	console.log("Image Id "+image_id);
	var Image = image(sequelizer, sequelize);
	Image.destroy({image_id : image_id}).on("success", function(u){
		res.send("Success");
	});
};