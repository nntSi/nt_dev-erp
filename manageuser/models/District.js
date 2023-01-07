const Sequelize = require('sequelize');
const sequelize = require('../database');

const District = sequelize.define('District', {
  district_name: Sequelize.STRING,
  province_id: Sequelize.INTEGER
});

District.sync({ alter: true });

module.exports = District;