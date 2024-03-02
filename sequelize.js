const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expressjs', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb'
});

module.exports = sequelize;