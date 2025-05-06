const express = require('express');
const router = express.Router();
const { createMenu, getAllMenus, deleteMenu } = require('../controllers/menuController');

// POST /api/menus → ajouter un menu
router.post('/', createMenu);

// ✅ GET /api/menus → récupérer tous les menus
router.get('/', getAllMenus);

// ✅ DELETE /api/menus/:id
router.delete('/:id', deleteMenu);

module.exports = router;
