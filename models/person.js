/**
 * New node file
 */
module.exports = function(sequelize, Sequelize) {
  var Person = sequelize.define('Person', {
    person_id : {type : Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement : true},
    person_name : {type : Sequelize.STRING, allowNull : false, primaryKey : true, unique : false},
    person_category : { type : Sequelize.INTEGER, allowNull : false},
  }, {
    classMethods: {
      associate: function(models) {
        Person.hasMany(models.Category);
      }
    }
  });
 
  return Person;
};
