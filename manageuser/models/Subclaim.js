const Sequelize = require('sequelize');
const sequelize = require('../database');

const Subclaim = sequelize.define('Subclaim', {
  svh_code: Sequelize.STRING,
  code_sub: Sequelize.STRING,
  date: Sequelize.STRING,
  time: Sequelize.STRING,
  inspector: Sequelize.STRING,
  inspector_id: Sequelize.STRING,
  inspector_mobile: Sequelize.STRING,
  location: Sequelize.STRING,
  company: Sequelize.STRING,
  type: Sequelize.STRING,
  source_employee: Sequelize.STRING,
  accident: Sequelize.STRING,
  employee: Sequelize.STRING,
  employee_id: Sequelize.INTEGER,
  province: Sequelize.INTEGER,
  district: Sequelize.INTEGER,
  customer_claim_mobile: Sequelize.STRING,
  customer_claim_name: Sequelize.STRING,
  license_plate: Sequelize.STRING,
  claim_code: Sequelize.STRING,
  insurance_code: Sequelize.STRING,
  time_dry: Sequelize.STRING,
  date_dry: Sequelize.STRING,
  sts: {type: Sequelize.INTEGER(11), defaultValue: 1}
});

Subclaim.sync({ alter: true });

module.exports = Subclaim;