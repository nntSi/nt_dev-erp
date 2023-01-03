const Sequelize = require("sequelize");
const sequelize = require("../database");

const Claim = sequelize.define("Claim", {
  date: Sequelize.STRING,
  time: Sequelize.STRING,
  company: Sequelize.STRING,
  type: Sequelize.STRING,
  source_employee: Sequelize.STRING,
  location: Sequelize.STRING,
  accident: Sequelize.STRING,
  employee: Sequelize.STRING,
  employee_id: Sequelize.INTEGER,
  Inspector: Sequelize.STRING,
  inspector_id: Sequelize.INTEGER,
  inspector_mobile: Sequelize.STRING,
  svh_code: Sequelize.STRING,
  time_dry: Sequelize.STRING,
  date_dry: Sequelize.STRING,
  province: Sequelize.INTEGER,
  district: Sequelize.INTEGER,
  brand_car: Sequelize.STRING,
  customer_cliam_mobile: Sequelize.STRING,
  customer_claim_name: Sequelize.STRING,
  license_plate: Sequelize.STRING,
});

Claim.sync({ alter: true });
module.exports = Claim;
