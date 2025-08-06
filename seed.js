const bcrypt = require('bcryptjs');
const {
    sequelize,
    User,
    Role,
    UserRole,
    Menu,
    RoleMenuAccess
} = require('./models');

async function seed() {
    try {
        await sequelize.sync({ force: true });

        const hashedPassword = await bcrypt.hash('admin123', 10);

        const user = await User.create({
            username: 'budi',
            password: hashedPassword,
            full_name: 'Budi Sudarsono'
        });

        const [adminRole, staffRole] = await Promise.all([
            Role.create({ name: 'admin' }),
            Role.create({ name: 'staff' })
        ]);

        await UserRole.bulkCreate([
            { user_id: user.id, role_id: adminRole.id },
            { user_id: user.id, role_id: staffRole.id }
        ]);

        const menu1 = await Menu.create({ name: 'Menu 1' });
        const menu1_1 = await Menu.create({ name: 'Menu 1.1', parent_id: menu1.id });
        const menu1_1_1 = await Menu.create({ name: 'Menu 1.1.1', parent_id: menu1_1.id });
        const menu1_1_1_1 = await Menu.create({ name: 'Menu 1.1.1.1', parent_id: menu1_1_1.id });
        const menu1_1_1_1_1 = await Menu.create({ name: 'Menu 1.1.1.1.1', parent_id: menu1_1_1_1.id });

        const menu2 = await Menu.create({ name: 'Menu 2' });
        const menu2_1 = await Menu.create({ name: 'Menu 2.1', parent_id: menu2.id });
        const menu2_1_1 = await Menu.create({ name: 'Menu 2.1.1', parent_id: menu2_1.id });
        const menu2_1_1_1 = await Menu.create({ name: 'Menu 2.1.1.1', parent_id: menu2_1_1.id });
        const menu2_1_1_1_1 = await Menu.create({ name: 'Menu 2.1.1.1.1', parent_id: menu2_1_1_1.id });

        await RoleMenuAccess.bulkCreate([
            ...[
                menu1, menu1_1, menu1_1_1, menu1_1_1_1, menu1_1_1_1_1,
                menu2, menu2_1, menu2_1_1, menu2_1_1_1, menu2_1_1_1_1
            ].map(menu => ({
                role_id: adminRole.id,
                menu_id: menu.id
            })),

            { role_id: staffRole.id, menu_id: menu1.id },
            { role_id: staffRole.id, menu_id: menu2.id }
        ]);

        console.log('Seeding berhasil!');
        process.exit(0);
    } catch (err) {
        console.error('Error saat seeding:', err);
        process.exit(1);
    }
}

seed();
