/**
 * New node file
 */

var mysql = require('mysql');

var connection = require('./connection');

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
	var celebrityName = req.param("name");
	var limit = req.param("limit");
	
		
	if(celebrityName != null && celebrityName.trim() !="") {
		console.log("Non Empty Params Value :: Celebrity Get method : ");
		console.log("Celebrity Name :: "+celebrityName+"  :limit :"+limit);
	} else {
		res.send();
	}
	
	if(limit != null && limit.trim() !="" && !isNaN(limit)) {
		limit = parseInt(limit);
	} else {
		limit = 10;
	}
	
	var videos = {};
	var images = {};
	var trailers = {};
	
	var personObject = {};
	
	//hard coded as of now to test
	personObject.person_id = 1;
	personObject.person_category = 1;
	
	/*connection.query("select * from videos", function(error, result){
		console.log("Using connection module "+result);
		connection.release();
	});*/
		
	
	pool.getConnection(function(error, connection) {
		if(error) {
			console.log(error);
		} else {
			var videoSql = "select * from videos where celebrity_id='"+personObject.person_id+"'"+" order by video_id desc limit "+limit;
			console.log(videoSql);
			
			connection.query(videoSql, function(error, result) {
				if(error) {
					console.log("Failed to get videos");
					res.send(error);
				} else {
					console.log("results "+result);
					videos = result;
					connection.release();
				}
			});
		}
	});
	
	pool.getConnection(function(error, connection) {
		if(error) {
			console.log(error);
		} else {
			var trailerSql = "select * from trailers where video_category='"+ personObject.person_category +"'"+" order by video_id desc limit "+limit;
			console.log(trailerSql);
			
			connection.query(trailerSql, function(error, result) {
				if(error) {
					console.log("Failed to get videos");
					res.send(error);
				} else {
					console.log("results "+result);
					trailers = result;
					connection.release();
				}
			});
		}
	});
	
	
	pool.getConnection(function(error, connection) {
		if(error) {
			console.log(error);
		} else {
			var imageSql = "select * from images where person_id='"+ personObject.person_id +"'"+" order by image_id desc limit "+limit;
			console.log(imageSql);
			
			connection.query(imageSql, function(error, result) {
				if(error) {
					console.log("Failed to get videos");
					res.send(error);
				} else {
					console.log("results "+result);
					images = result;
					connection.release();
					var results = {
							"images" : images,
							"videos" : videos,
							"trailers" : trailers
							};
					res.send(results);
				}
			});
		}
	});
	
	/*pool.getConnection(function(error, connection){
		if(error) {
			console.log("Get connection failed");
		}
		var personSql = "select * from person where person_name = '"+celebrityName+"'";
		console.log("Person Select Query :"+personSql);
		
		var personObject = {};
		
		//hard coded as of now to test
		personObject.person_id = 1;
		personObject.person_category = 1;
		
		
		
		connection.query(personSql, function(error, results){
			if(error) {
				console.log("Get persons failed");
				res.send(error);
			} else {
				console.log("results "+results);
				//res.writeHead(200);
				personObject = results;
				connection.release();
			}
		});
		
		var videoSql = "select * from videos where celebrity_id='"+personObject.person_id+"'";
		console.log(videoSql);
		
		connection.query(videoSql, function(error, result) {
			if(error) {
				console.log("Failed to get videos");
				res.send(error);
			} else {
				console.log("results "+result);
				videos = result;
			}
		});
	
		var trailerSql = "select * from trailers where video_category='"+ personObject.person_category +"'";
		console.log(trailerSql);
		
		connection.query(trailerSql, function(error, result) {
			if(error) {
				console.log("Failed to get videos");
				res.send(error);
			} else {
				console.log("results "+result);
				trailers = result;
			}
		});
		
		
		var imageSql = "select * from images where person_id='"+ personObject.person_id +"'";
		console.log(imageSql);
		
		connection.query(imageSql, function(error, result) {
			if(error) {
				console.log("Failed to get videos");
				res.send(error);
			} else {
				console.log("results "+result);
				images = result;
			}
		});*/
		
	
};