
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mysql = require('mysql');
var celebrity = require('./routes/celebrity');
var sequelize = require('sequelize');
var category = require('./models/category');
var video = require('./models/video');
var image = require('./models/image');
var person = require('./models/person');
var trailer = require('./models/trailer');
var sequelizeconnector = require('./sequelizecontroller/sequelizeconnector');
var categorycontroller = require('./routes/categorycontroller');
var videocontroller = require('./routes/videocontroller');
var imagecontroller = require('./routes/imagecontroller');
var personcontroller = require('./routes/personcontroller');
var trailercontroller = require('./routes/trailercontroller');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('models', path.join(__dirname, 'models'));
app.set('view engine', 'jade');
//app.use(express.favicon());
app.use(express.favicon(__dirname + '/public/images/logo.png'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.set('pool', celebrity.pool);
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


//routing handlers
app.get('/', routes.index);
app.get('/users', user.list);
//app.get('/:name/:limit', celebrity.celebrity);
app.post('/category', categorycontroller.create);
app.get('/category/:category_id', categorycontroller.readById);
app.delete('/category/:category_id', categorycontroller.remove);
app.put('/category/:category_id', categorycontroller.update);

app.post('/video', videocontroller.create);
app.get('/video/:video_id', videocontroller.readById);
app.delete('/video/:video_id', videocontroller.remove);
app.put('/video/:video_id', videocontroller.update);

app.post('/image', imagecontroller.create);
app.get('/image/:image_id', imagecontroller.readById);
app.delete('/image/:image_id', imagecontroller.remove);
app.put('/image/:image_id', imagecontroller.update);

app.post('/person', personcontroller.create);
app.get('/person/:person_id', personcontroller.readById);
app.delete('/person/:person_id', personcontroller.remove);
app.put('/person/:person_id', personcontroller.update);

app.post('/trailer', trailercontroller.create);
app.get('/trailer/:video_id', trailercontroller.readById);
app.delete('/trailer/:video_id', trailercontroller.remove);
app.put('/trailer/:video_id', trailercontroller.update);

/* app.post('/', );
 * app.put('/'. );
 * app.delte();
 * 
 * 
 */

//NEED to create mapping for CRUD operation


var server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
/*  app.get('pool').getConnection(function(error, connection) {
		
  });*/
  celebrity.pool.getConnection(function(error, connection){
	 console.log("Acquring connection from db :");
	 if(error) {
		 console.log("Failed to get connection :");
	 } else{
		 console.log("Connection acquired :");
	 }
  });
  var sequelizer = sequelizeconnector;
  console.log(sequelizer);
  
  var Person = person(sequelizer, sequelize);
  Person.sync();
  console.log(Person);
  
  var Category = category(sequelizer, sequelize);
  Category.hasOne(Person, { foreignKey: 'person_category' , foreignKeyConstraint:true });
  Category.sync();
  console.log(Category);
  
 
  
  var Image = image(sequelizer, sequelize);
  Image.sync();
  console.log(Image);
  
  var Video = video(sequelizer, sequelize);
  Video.sync();
  console.log(Video);
  
  var Trailer = trailer(sequelizer, sequelize);
  Trailer.sync();
  console.log(Trailer);
  
});

