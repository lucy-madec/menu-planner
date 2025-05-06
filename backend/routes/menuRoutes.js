const express = require('express');
const router = express.Router();
const { createMenu, getAllMenus } = require('../controllers/menuController');

// POST /api/menus → ajouter un menu
router.post('/', createMenu);

// ✅ GET /api/menus → récupérer tous les menus
router.get('/', getAllMenus);

module.exports = router;
