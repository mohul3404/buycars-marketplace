const sequelize = require('../config/database');
const Dealer = require('./Dealer');
const OemSpec = require('./OemSpec');
const MarketplaceInventory = require('./MarketplaceInventory');

Dealer.hasMany(MarketplaceInventory, { foreignKey: 'dealer_id' });
MarketplaceInventory.belongsTo(Dealer, { foreignKey: 'dealer_id' });
OemSpec.hasMany(MarketplaceInventory, { foreignKey: 'oem_spec_id' });
MarketplaceInventory.belongsTo(OemSpec, { foreignKey: 'oem_spec_id' });


const db = {
  sequelize,
  Dealer,
  OemSpec,
  MarketplaceInventory
};

module.exports = db;