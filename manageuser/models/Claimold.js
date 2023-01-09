const Sequelize = require("sequelize");
const sequelize = require("../database");

const Claimold = sequelize.define("Claimold", {
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
  customer_claim_mobile: Sequelize.STRING,
  customer_claim_name: Sequelize.STRING,
  license_plate: Sequelize.STRING,
  claim_code: Sequelize.STRING,
  insurance_code: Sequelize.STRING,
  sts: {type: Sequelize.INTEGER(11), defaultValue: 1}
});

Claimold.sync({ alter: true });
module.exports = Claimold;
