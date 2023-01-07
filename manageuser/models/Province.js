const Sequelize = require('sequelize');
const sequelize = require('../database');

const Province = sequelize.define('Province', {
  province_name: Sequelize.STRING,
});

Province.sync({ alter: true });

module.exports = Province;