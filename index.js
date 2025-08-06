const express = require('express');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');

require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.get('/', (_, res) => res.send('API running...'));
app.use('/auth', authRoutes);
app.use('/menus', menuRoutes);

sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
