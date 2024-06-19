const mongoose = require('mongoose');
const Person = require('./models/person');
require('dotenv').config();

// Connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Database connection error: ', err));

// Create and save a single person
const createAndSavePerson = () => {
  const newPerson = new Person({
    name: 'John Doe',
    age: 30,
    favoriteFoods: ['Pizza', 'Burger']
  });

  newPerson.save((err, data) => {
    if (err) return console.error(err);
    console.log('Person saved successfully:', data);
  });
};

// Create many people at once
const createManyPeople = (arrayOfPeople) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    console.log('People created successfully:', data);
  });
};

const arrayOfPeople = [
  { name: 'Jane Doe', age: 25, favoriteFoods: ['Salad', 'Pasta'] },
  { name: 'Mike Smith', age: 35, favoriteFoods: ['Steak', 'Fries'] },
  { name: 'Mary', age: 22, favoriteFoods: ['Pizza', 'Burger'] },
  { name: 'Mary', age: 32, favoriteFoods: ['Pizza', 'Sushi'] }
];

// Find people by name
const findPeopleByName = (personName) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err);
    console.log('People found:', data);
  });
};

// Find one person by favorite food
const findOneByFood = (food) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    console.log('Person found:', data);
  });
};

// Find a person by ID
const findPersonById = (personId) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    console.log('Person found by ID:', data);
  });
};

// Find a person by ID, update their favorite foods, and save
const findEditThenSave = (personId) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push('Hamburger');
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      console.log('Updated person:', updatedPerson);
    });
  });
};

// Find a person by name and update their age
const findAndUpdate = (personName) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, updatedPerson) => {
      if (err) return console.error(err);
      console.log('Person updated:', updatedPerson);
    }
  );
};

// Remove a person by ID
const removeById = (personId) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.error(err);
    console.log('Person removed:', removedPerson);
  });
};

// Remove all people named "Mary"
const removeManyPeople = () => {
  Person.remove({ name: 'Mary' }, (err, result) => {
    if (err) return console.error(err);
    console.log('People removed:', result);
  });
};

// Chain search query helpers
const queryChain = () => {
  Person.find({ favoriteFoods: 'Burritos' })
    .sort({ name: 1 })
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) return console.error(err);
      console.log('Query Chain result:', data);
    });
};

// Execute functions for demonstration
createAndSavePerson();
createManyPeople(arrayOfPeople);
findPeopleByName('Jane Doe');
findOneByFood('Pizza');
findPersonById('some_person_id_here');
findEditThenSave('some_person_id_here');
findAndUpdate('Jane Doe');
removeById('some_person_id_here');
removeManyPeople();
queryChain();
