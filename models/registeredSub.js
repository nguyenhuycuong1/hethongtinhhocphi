'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RegisteredSub extends Model {
    
    static associate(models) {
      RegisteredSub.belongsTo(models.Invoice, {foreignKey: 'invCode', targetKey: 'invoiceCode'})
      RegisteredSub.belongsTo(models.Subject, {foreignKey: 'subCode', targetKey: 'subjectCode'})
    }
  }
  RegisteredSub.init({
    subCode: {type: DataTypes.STRING, primaryKey: true},
    invCode: {type: DataTypes.STRING, primaryKey: true}
  }, {
    sequelize,
    modelName: 'RegisteredSub',
  });
  return RegisteredSub;
};