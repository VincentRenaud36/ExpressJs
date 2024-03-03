const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projetexpress', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb'
});

module.exports = sequelize;