'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Annonce extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Annonce.belongsTo(models.Bien);
      Annonce.belongsTo(models.Acheteur);
    }
  };
  Annonce.init({
    date_debut_vente: DataTypes.DATE,
    date_fin_vente: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Annonce',
  });
  return Annonce;
};