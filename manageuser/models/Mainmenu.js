const Sequelize = require('sequelize');
const sequelize = require('../database');

const Mainmenu = sequelize.define('Mainmenu', {
  menu_name: Sequelize.STRING,
  sub_menu: Sequelize.STRING,
  privi: Sequelize.STRING,
  route: Sequelize.STRING,
  icon: Sequelize.STRING,
  isChecked: {type: Sequelize.INTEGER(11), defaultValue: 0}
});

Mainmenu.sync({ alter: true });

module.exports = Mainmenu;