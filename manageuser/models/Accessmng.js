const Sequelize = require('sequelize');
const sequelize = require('../database');

const Accessmng = sequelize.define('Accessmng', {
  position_name: Sequelize.STRING,
  menu_privi: Sequelize.STRING,
  department: Sequelize.STRING
});

Accessmng.sync({ alter: true });

module.exports = Accessmng;