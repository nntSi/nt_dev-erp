const Sequelize = require('sequelize');
const sequelize = require('../database');

const Company = sequelize.define('Company', {
  company_name: Sequelize.STRING,
});

Company.sync({ alter: true });

module.exports = Company;