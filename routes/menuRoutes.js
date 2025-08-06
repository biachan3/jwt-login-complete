const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, menuController.getMenusByRole);

module.exports = router;
