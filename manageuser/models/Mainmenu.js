const Sequelize = require('sequelize');
const sequelize = require('../database');

const Mainmenu = sequelize.define('Mainmenu', {
  menu_name: Sequelize.STRING,
  sub_menu: Sequelize.STRING,
  privi: Sequelize.STRING,
  route: Sequelize.STRING,
  icon: Sequelize.STRING
});

Mainmenu.sync({ alter: true });

module.exports = Mainmenu;