const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define('Menu', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        path: {
            type: DataTypes.STRING
        },
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'menus',
        timestamps: true,
        underscored: true
    });
