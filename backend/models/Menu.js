const mongoose = require('mongoose');

// Définition du schéma d’un menu
const menuSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
  },
  meal: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String], // Tableau de chaînes de caractères
    default: [],
  }
});

// Export du modèle
module.exports = mongoose.model('Menu', menuSchema);
