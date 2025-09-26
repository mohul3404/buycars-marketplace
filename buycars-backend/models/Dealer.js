const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dealer = sequelize.define('Dealer', {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Dealer;