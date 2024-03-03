const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize');

const User = sequelize.define('User', {
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    isAdmin:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isBanned:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});
module.exports = User;