require('dotenv').config()
const mongoose = require('mongoose')
const Person = require('./models/person')
// Connexion a MongoDB
const mongoURI = process.env.ONGO_URI

mongoose.connect('mongodb://localhost:27017/mangouste', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connexion réussie');
})
.catch(err => {
  console.error('Erreur de connexion:', err.message);
});



// fonction pour crée et sauvegarder une personne 
const createAndSavePerson = async () => {
  const person = new Person({
    name: "John Doe",
    age: 25,
    favoriteFoods: ["pizza", "pasta"]
  })

  try {
    const data = await person.save()
    console.log('Person savegarder avec succès:', data)
  } catch (err) {
    console.log('Error saving person:', err)
  }
}
// Appel de la fonction
createAndSavePerson()

// fonction pour crée plusieurs personnes 
const createManyPeople = async (arrayOfPeople) => {
  try {
    const data = await Person.create(arrayOfPeople)
    console.log('plusieurs personnes on été crées:', data)
  } catch (err) {
    console.log('Error de créations des personnes:', err)
  }
}

// Fonction pour trouver les personnes par leur nom
const findPeopleByName = async (name) => {
  try {
    const data = await Person.find({ name: name })
    console.log('Trouver par nom:', data)
  } catch (err) {
    console.log('Error de personne trouver:', err)
  }
}

// Fonction pour trouver des personnes par aliment préférer
const findOneByFood = async (food) => {
  try {
    const data = await Person.findOne({ favoriteFoods: food })
    console.log('trouver par aliment:', data);
  } catch (err) {
    console.log('Error de personne trouver', err)
  }
};

// Fonction pour trouver une personne par son ID
const findPersonById = async (personId) => {
  try {
    const data = await Person.findById(personId)
    console.log('trouver par ID:', data)
  } catch (err) {
    console.log('Error finding person:', err)
  }
}

// Fonction pour modifier et sauvegarder une personne
const findEditThenSave = async (personId) => {
  try {
    const person = await Person.findById(personId)
    person.favoriteFoods.push("hamburger")
    const data = await person.save();
    console.log('sauvegarder une personne:', data)
  } catch (err) {
    console.log('Error updating person:', err)
  }
}

// Fonction pour trouver et mettre ajour une personne
const findAndUpdate = async (personName) => {
  try {
    const data = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true }
    );
    console.log('trouver et mise a jours:', data)
  } catch (err) {
    console.log('Error updating person:', err)
  }
}

// fonction pour supprimer une personne par ID
const removeById = async (personId) => {
  try {
    const data = await Person.findByIdAndRemove(personId)
    console.log('supprimer une personne:', data)
  } catch (err) {
    console.log('Error removing person:', err)
  }
}

// fonction pour supprimer toutes personne nomée par Mary
const removeManyPeople = async () => {
  try {
    const data = await Person.deleteMany({ name: "Mary" })
    console.log('supprimer des personnes:', data)
  } catch (err) {
    console.log('Error removing people:', err)
  }
}

// fonctions pour chainner des requete de recherche
const queryChain = async () => {
  try {
    const data = await Person
      .find({ favoriteFoods: "burrito" })
      .sort({ name: 1 })
      .limit(2)
      .select("-age")
      .exec();
    console.log('Chain query results:', data)
  } catch (err) {
    console.log('Error dans la chaine de requete:', err)
  }
}

//usage
const samplePeople = [
  { name: "Mary", age: 25, favoriteFoods: ["pizza"] },
  { name: "John", age: 30, favoriteFoods: ["burrito", "taco"] },
  { name: "Mary", age: 28, favoriteFoods: ["sushi", "burrito"] }
]

// Execution des fonctions
const runDatabase = async () => {
  await createAndSavePerson()
  await createManyPeople(samplePeople)
}

// database operations
runDatabase().catch(console.log)

