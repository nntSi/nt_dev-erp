const Sequelize = require('sequelize');
const sequelize = require('../database');

const Department = sequelize.define('Department', {
  department_name: Sequelize.STRING,
});

Department.sync({ alter: true });

module.exports = Department;