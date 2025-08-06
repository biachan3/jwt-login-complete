const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    }, {
        tableName: 'roles',
        timestamps: true,
        underscored: true
    });
