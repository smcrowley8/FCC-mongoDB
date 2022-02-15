require('dotenv').config();
var mongoose = require('mongoose');
let myURI = process.env['MONGO_URI'];

mongoose.connect(myURI, 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }
);

//make schema
let personSchema = new mongoose.Schema({
  name : String,
  age :  Number,
  favoriteFoods : [String]
});
let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let docInstance = new Person({
    name: "seanC",
    age: 25,
    favoriteFoods: ["Steak", "Mashed potatoes", "his own tears"]
  });
  docInstance.save(function(err, data){
    if (err){
      return done(err);
    }
    return done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data)=>{
    if(err) return done(err);
    return done(null, data);
  });
};

const findOneByFood = (food, done) => {
  console.log(food);
  Person.findOne({favoriteFoods: [food]}, (err, data)=>{
    if(err) return done(err);
    return done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data)=>{
    if(err) return done(err);
    return done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findOne({_id: personId})
  .then(p=>{
    p.favoriteFoods.push(foodToAdd);
    p.markModified('favoriteFoods');
    p.save( (err, data)=>{
      if (err){
        return done(err);
      }
      return done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    {'name': personName},
    {$set: {'age': ageToSet}},
    { new: true },
    (err, data)=>{
      if (err){
        return done(err);
      }
      return done(null, data);      
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    personId,
    (err, data)=>{
      if (err){
        return done(err);
      }
      return done(null, data);      
    }
  );
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove(
    {'name': nameToRemove}, 
    (err, data)=>{
      if (err){
        return done(err);
      }
      return done(null, data);      
    }
  );
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find(
    {favoriteFoods: foodToSearch}
    ).sort(
      {name: 1}
    ).limit(2).select('name favoriteFoods')
    .exec(done);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
