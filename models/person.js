const mongoose = require('mongoose')

// Defini un schema d'une personne
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})

//Créer et exporter le modèle Personne.
module.exports = mongoose.model('Person', personSchema)