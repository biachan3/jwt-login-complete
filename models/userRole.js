const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define('UserRole', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'user_roles',
        timestamps: false,
        underscored: true
    });
