'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    
    static associate(models) {
      Invoice.belongsTo(models.Semester, {foreignKey: 'semeCode', targetKey: 'semesterCode'})
      Invoice.hasMany(models.RegisteredSub, {foreignKey: 'invCode'})
    }
  }
  Invoice.init({
    invoiceCode: {type: DataTypes.STRING, primaryKey: true},
    semeCode: DataTypes.STRING,
    totalFees: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};