const { Sequelize } = require('sequelize');

const dbName = 'railway';
const dbUser = 'root';
const dbPassword = 'ofdNKgEPKBTHwdnhhKUGpJZjydRaHZPa'; 
const dbHost = 'ballast.proxy.rlwy.net';
const dbPort = '46236';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql'
});

module.exports = sequelize;