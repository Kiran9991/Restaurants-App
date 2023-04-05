const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Orders = sequelize.define('orderDetails', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  price: Sequelize.DOUBLE,
  dish: Sequelize.STRING,
  table: Sequelize.STRING,
});

module.exports = Orders;