const Sequelize = require('sequelize');
const sequelize = require('../database');

const Submenu = sequelize.define('Submenu', {
  menu_name: Sequelize.STRING,
  privi: Sequelize.STRING,
  route: Sequelize.STRING
});

Submenu.sync({ alter: true });

module.exports = Submenu;