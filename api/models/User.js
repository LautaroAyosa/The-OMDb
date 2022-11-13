const { DataTypes } = require('sequelize')
const { sequelize } = require('./index')
const { Person } = require('./Person')
const { Movie } = require('./Movie')

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: { 
        type: DataTypes.STRING,
    },
    hashPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
})


module.exports = User