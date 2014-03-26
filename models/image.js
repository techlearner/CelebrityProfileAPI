/**
 * New node file
 */
module.exports = function(sequelize, Sequelize) {
  var Image = sequelize.define('Image', {
    image_id : {type : Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement : true},
    image_url : {type : Sequelize.STRING, allowNull : false},
    image_thumb_url : {type : Sequelize.STRING, allowNull : false},
    person_id : {type : Sequelize.INTEGER, allowNull : false}
  }, {
    classMethods: {
      associate: function(models) {
        Image.hasMany(models.Person);
      }
    }
  });
 
  return Image;
};