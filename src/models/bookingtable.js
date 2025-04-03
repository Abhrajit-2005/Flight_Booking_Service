'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookingTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BookingTable.init({
    flight_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    no_of_seats: DataTypes.INTEGER,
    totalCost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BookingTable',
  });
  return BookingTable;
};