'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agent_immo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Agent_immo.belongsTo(models.Agence)
    }
  };
  Agent_immo.init({
    name: DataTypes.STRING,
    tel: DataTypes.STRING,
    email: DataTypes.STRING,
    pwd: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Agent_immo',
  });
  return Agent_immo;
};