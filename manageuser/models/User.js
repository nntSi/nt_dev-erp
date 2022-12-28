const Sequelize = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  title: Sequelize.STRING,
  fullname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  nickname: Sequelize.STRING,
  mobile: Sequelize.STRING,
  privi: Sequelize.INTEGER,
  email: Sequelize.STRING,
  token: Sequelize.STRING,
  image: Sequelize.STRING,
  department: Sequelize.INTEGER,
});

User.sync({ alter: true });

module.exports = User;