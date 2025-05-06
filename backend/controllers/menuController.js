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

// 🗑️ Supprimer un menu par son ID
const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMenu = await Menu.findByIdAndDelete(id);

    if (!deletedMenu) {
      return res.status(404).json({ message: "Menu non trouvé" });
    }

    res.status(200).json({ message: "Menu supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du menu :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ✏️ Modifier un menu par son ID
const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { day, meal, ingredients } = req.body;

    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      { day, meal, ingredients },
      { new: true, runValidators: true }
    );

    if (!updatedMenu) {
      return res.status(404).json({ message: "Menu non trouvé" });
    }

    res.status(200).json(updatedMenu);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du menu :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  createMenu,
  getAllMenus,
  deleteMenu,
  updateMenu,
};
