const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'svh_db_prd', 
  'root', 
  'Surveyhubtrue', 
  {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;