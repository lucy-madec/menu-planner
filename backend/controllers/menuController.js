const Menu = require("../models/Menu");

// ➕ Ajouter un nouveau menu
const createMenu = async (req, res) => {
  try {
    const { day, meal, ingredients } = req.body;

    // Vérification simple
    if (!day || !meal) {
      return res
        .status(400)
        .json({ message: "Le jour et le repas sont obligatoires." });
    }

    const newMenu = new Menu({
      day,
      meal,
      ingredients,
    });

    const savedMenu = await newMenu.save();
    res.status(201).json(savedMenu);
  } catch (error) {
    console.error("Erreur lors de l’ajout du menu :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ✅ 🆕 Obtenir tous les menus
const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find(); // Récupère tous les menus
    res.status(200).json(menus);
  } catch (error) {
    console.error("Erreur lors de la récupération des menus :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  createMenu,
  getAllMenus,
};
