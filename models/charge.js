'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Charge extends Model {
    
    static associate(models) {
      
    }
  }
  Charge.init({
    charge: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Charge',
  });
  return Charge;
};