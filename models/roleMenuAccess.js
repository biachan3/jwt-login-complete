const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define('RoleMenuAccess', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        menu_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'role_menu_access',
        timestamps: false,
        underscored: true
    });
