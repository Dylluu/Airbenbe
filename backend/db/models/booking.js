'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      })
      Booking.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Booking.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: {
          args: new Date().toString(),
          msg: 'startDate cannot be before current time'
        }
      }
    },
    endDate: {
      type: DataTypes.DATEONLY,
      validate: {
        endDate(value){
          if(value <= this.startDate){
            throw new Error('endDate cannot be on or before startDate')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
