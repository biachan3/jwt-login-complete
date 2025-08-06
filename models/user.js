const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        full_name: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'users',
        timestamps: true,
        underscored: true
    });
