const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Role, UserRole } = require('../models');

const SECRET_KEY = 'secret-jwt-key';

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: 'Invalid password' });

        const userRoles = await UserRole.findAll({
            where: { user_id: user.id },
            include: [{ model: Role }]
        });

        const roles = userRoles.map(ur => ({
            id: ur.Role.id,
            name: ur.Role.name
        }));

        if (roles.length === 1) {
            const token = jwt.sign({
                user_id: user.id,
                username: user.username,
                role_id: roles[0].id
            }, SECRET_KEY, { expiresIn: '1d' });

            return res.json({
                token,
                role: roles[0]
            });
        }

        const tempToken = jwt.sign({ user_id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '5m' });

        return res.json({
            message: 'Multiple roles found',
            roles,
            tempToken
        });


    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.selectRole = async (req, res) => {
    const { user_id, selected_role_id } = req.body;

    try {
        const user = await User.findByPk(user_id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const role = await Role.findByPk(selected_role_id);
        if (!role) return res.status(404).json({ message: 'Role not found' });

        const token = jwt.sign({
            user_id: user.id,
            username: user.username,
            role_id: role.id
        }, SECRET_KEY, { expiresIn: '1d' });

        return res.json({ token, role });

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
