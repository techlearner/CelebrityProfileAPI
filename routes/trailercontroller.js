/**
 * New node file
 */
var trailer = require('../models/trailer');
var sequelizeconnector = require('../sequelizecontroller/sequelizeconnector');
var sequelizer = sequelizeconnector;
var sequelize = require('sequelize');

module.exports.update = function(req, res) {
	
	var video_url = req.body.video_url;
	var video_thumb_url = req.body.video_thumb_url;
	var video_title = req.body.video_title;
	var video_category = req.body.video_category;
	
	var video_id = req.body.video_id;
	var Trailer = trailer(sequelizer, sequelize);
	var createdAt = new Date();
	var updatedAt = new Date();
	console.log(video_url+"  "+video_title+" "+video_id);
	
	Trailer.find({ where: {video_id : video_id} }).on('success', function(video) {
		  if (video) {
			  video.updateAttributes({
				  video_url : video_url,
				  video_thumb_url : video_thumb_url,
				  video_title : video_title,
				  video_category : video_category,
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
	var video_url = req.body.video_url;
	var video_thumb_url = req.body.video_thumb_url;
	var video_title = req.body.video_title;
	var video_category = req.body.video_category;
	
	var video_id = req.body.video_id;
	var Trailer = trailer(sequelizer, sequelize);
	var createdAt = new Date();
	var updatedAt = new Date();
	console.log(video_url+"  "+video_title+" "+video_id);
	var model = Trailer.create({
		video_id : video_id,
		video_url : video_url,
		video_thumb_url : video_thumb_url,
		video_category : video_category,
		video_title : video_title,
		createdAt : createdAt,
		updatedAt : updatedAt
	});
	
	model.on("success", function(){
		res.send("Success");
	});
	
	model.on("error", function(){
		console.log("error");
		res.send("Failure");
	});
	
	model.on("failure", function(){
		console.log("fail");
		res.send("Failure");
	});
};

module.exports.readById = function(req, res) {
	var video_id = req.params.video_id;
	console.log("video_id "+video_id);
	var Trailer = trailer(sequelizer, sequelize);
	Trailer.find({"where" : {video_id:video_id}}).success(function(trailer){
		res.send(trailer);
	});
};

module.exports.remove = function(req, res) {
	var video_id = req.params.video_id;
	console.log("video_id "+video_id);
	var Trailer = trailer(sequelizer, sequelize);
	
	Trailer.destroy({video_id : video_id}).on("success", function(u){
		res.send("Success");
	});
};