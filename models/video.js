/**
 * New node file


 */

var Sequelize = require('sequelize');

module.exports = function(sequelize, Sequelize) {
  var Video = sequelize.define('Video', {
    video_id : {type : Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement : true},
    video_url : {type : Sequelize.STRING, allowNull : false},
    video_thumb_url : {type : Sequelize.STRING, allowNull : false},
    video_title : {type : Sequelize.STRING, allowNull : false},
    celebrity_id : {type : Sequelize.INTEGER, allowNull : false}
  }, {
    classMethods: {
      associate: function(models) {
         Video.hasMany(models.Person);
      }
    }
  });
 
  return Video;
};