'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class faq_answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      faq_answer.belongsTo(models.faq,{});
    }
  }
  faq_answer.init({
    question_id: DataTypes.INTEGER,
    answers: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'faq_answer',
  });
  return faq_answer;
};