const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize');

const Image = sequelize.define('Image', {
    filename:{
        type: DataTypes.STRING,
        allowNull: false
    },
    filePath:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Image;