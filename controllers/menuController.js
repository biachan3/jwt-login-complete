const { RoleMenuAccess, Menu } = require('../models');

function buildNestedMenus(menus, parentId = null) {
    return menus
        .filter(menu => menu.parent_id === parentId)
        .map(menu => ({
            id: menu.id,
            name: menu.name,
            children: buildNestedMenus(menus, menu.id)
        }));
}

exports.getMenusByRole = async (req, res) => {
    const roleId = req.user.role_id;

    try {
        const access = await RoleMenuAccess.findAll({
            where: { role_id: roleId },
            include: [{
                model: Menu,
                attributes: ['id', 'name', 'parent_id'] // ⬅️ wajib!
            }]
        });

        console.log('RoleMenuAccess:', access.map(a => a.toJSON()));

        const flatMenus = access.map(item => item.Menu);
        console.log('Flat menus:', flatMenus.map(m => ({
            id: m.id,
            name: m.name,
            parent_id: m.parent_id
        })));

        const nested = buildNestedMenus(flatMenus);
        console.log('Nested menus:', JSON.stringify(nested, null, 2));

        res.json(nested);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
