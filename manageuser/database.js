const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'manageuser', 
  'root', 
  'Surveyhubtrue', 
  {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;