const express = require('express');
const router = express.Router();
const { createMenu } = require('../controllers/menuController');

// Route POST pour ajouter un menu
router.post('/', createMenu);

module.exports = router;
