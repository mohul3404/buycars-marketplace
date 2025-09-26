// models/OemSpec.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OemSpec = sequelize.define('OemSpec', {
  make: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  list_price: {
    type: DataTypes.DECIMAL(10, 2),
  },
  power_bhp: {
    type: DataTypes.INTEGER,
  },
  max_speed_kmph: {
    type: DataTypes.INTEGER,
  },
}, {
  timestamps: true
});

module.exports = OemSpec;