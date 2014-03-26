/**
 * New node file
 */

var video = require('../models/video');
var sequelizeconnector = require('../sequelizecontroller/sequelizeconnector');
var sequelizer = sequelizeconnector;
var sequelize = require('sequelize');

module.exports.update = function(req, res) {
	var video_url = req.body.video_url;
	var video_thumb_url = req.body.video_thumb_url;
	var video_title = req.body.video_title;
	var celebrity_id = req.body.celebrity_id;
	
	var video_id = req.body.video_id;
	var Video = video(sequelizer, sequelize);
	var createdAt = new Date();
	var updatedAt = new Date();
	console.log(video_url+"  "+video_title+" "+video_id);
	
	Video.find({ where: {video_id : video_id} }).on('success', function(video) {
		  if (video) {
			  video.updateAttributes({
				  video_url : video_url,
				  video_thumb_url : video_thumb_url,
				  video_title : video_title,
				  celebrity_id : celebrity_id,
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
	var celebrity_id = req.body.celebrity_id;
	
	var video_id = req.body.video_id;
	var Video = video(sequelizer, sequelize);
	var createdAt = new Date();
	var updatedAt = new Date();
	console.log(video_url+"  "+video_title+" "+video_id);
	Video.create({
		video_id : video_id,
		video_url : video_url,
		video_thumb_url : video_thumb_url,
		video_title : video_title,
		celebrity_id :celebrity_id ,
		createdAt : createdAt,
		updatedAt : updatedAt
	}).success(function(){
	res.send("Success");
	});
};

module.exports.readById = function(req, res) {
	var video_id = req.params.video_id;
	console.log("video_id "+video_id);
	var Video = video(sequelizer, sequelize);
	var response = Video.find({"where" : {video_id:video_id}}).success(function(video){
		res.send(video);
	});
};

module.exports.remove = function(req, res) {
	var video_id = req.params.video_id;
	console.log("video_id "+video_id);
	var Video = video(sequelizer, sequelize);
	Video.destroy({video_id : video_id}).on("success", function(u){
		res.send("Success");
	});
};
