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
    flight_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['BOOKED', 'CANCELLED', 'PENDING', 'IN_PROGRESS'],
      defaultValue: 'IN_PROGRESS',
      allowNull: false
    },
    no_of_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    totalCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'BookingTable',
  });
  return BookingTable;
};