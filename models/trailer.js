/**
 * New node file
 */
module.exports = function(sequelize, Sequelize) {
  var Trailer = sequelize.define('Trailer', {
    video_id : {type : Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement : true},
    video_url : {type : Sequelize.STRING, allowNull : false},
    video_thumb_url : {type : Sequelize.STRING, allowNull : false},
    video_title : {type : Sequelize.STRING, allowNull : false},
    video_category : {type : Sequelize.INTEGER, allowNull : false},
  });
 
  return Trailer;
};