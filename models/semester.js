'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Semester extends Model {
    
    static associate(models) {
      Semester.hasOne(models.Invoice, {foreignKey: 'semeCode'})
    }
  }
  Semester.init({
    semesterCode: {type: DataTypes.STRING, primaryKey: true},
    semesterDesc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Semester',
  });
  return Semester;
};