const { Sequelize } = require('sequelize');
const config = require('../config/config').development;

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

const User = require('./user')(sequelize);
const Role = require('./role')(sequelize);
const UserRole = require('./userRole')(sequelize);
const Menu = require('./menu')(sequelize);
const RoleMenuAccess = require('./roleMenuAccess')(sequelize);

User.belongsToMany(Role, { through: UserRole, foreignKey: 'user_id' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'role_id' });

Role.belongsToMany(Menu, { through: RoleMenuAccess, foreignKey: 'role_id' });
Menu.belongsToMany(Role, { through: RoleMenuAccess, foreignKey: 'menu_id' });

Menu.hasMany(Menu, { as: 'children', foreignKey: 'parent_id' });
Menu.belongsTo(Menu, { as: 'parent', foreignKey: 'parent_id' });

UserRole.belongsTo(Role, { foreignKey: 'role_id' });
UserRole.belongsTo(User, { foreignKey: 'user_id' });

RoleMenuAccess.belongsTo(Menu, { foreignKey: 'menu_id' });
RoleMenuAccess.belongsTo(Role, { foreignKey: 'role_id' });

module.exports = {
    sequelize,
    User,
    Role,
    UserRole,
    Menu,
    RoleMenuAccess
};
