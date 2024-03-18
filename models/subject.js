'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subject.hasOne(models.RegisteredSub, {foreignKey: 'invCode'})
    }
  }
  Subject.init({
    subjectCode: {type: DataTypes.STRING, primaryKey:true},
    subjectName: DataTypes.STRING,
    credit: DataTypes.INTEGER,
    coe: DataTypes.FLOAT,
    semeCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};