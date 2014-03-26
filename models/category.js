/**
 * New node file
 */

var Sequelize = require('sequelize');


module.exports = function(sequelize, Sequelize) {
  var Category = sequelize.define('Category', {
    category_id : {type : Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement : true},
    category_name : {type : Sequelize.STRING, allowNull : false, unique : false},
  });
 
  return Category;
};