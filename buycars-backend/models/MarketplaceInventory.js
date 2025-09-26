const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MarketplaceInventory = sequelize.define('MarketplaceInventory', {
  kms_on_odometer: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  major_scratches: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  original_paint: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  num_accidents_reported: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  num_previous_buyers: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  registration_place: {
    type: DataTypes.STRING,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.JSON,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  listingPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
  }
});

module.exports = MarketplaceInventory;