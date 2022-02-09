//add code to require the express package
const express = require("express");
// create a route that the front end can request data from
const { animals } = require("./data/animals");

// set an environment variable, use this port, if se, or default to PORT 80
const PORT = process.env.PORT || 3001;

// add code to instantiate the server
const app = express();

function filterByQuery(query, animalsArray) {
  let personalityTraitsArray = [];
  // Note that we save the animalsArray as filteredResults here:
  let filteredResults = animalsArray;
  if (query.personalityTraits) {
    // save personalityTraits as a dedicated array
    // If personalityTraits is a string, place it into a new array and save
    if (typeof query.personalityTraits === "string") {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    // Loop through each trait in the personalityTraits array:
    personalityTraitsArray.forEach((trait) => {
      // Check the trait against each animal in the filteredResults array.
      // Remember, it is initially a copy of the animalsArray,
      // but here we're updating it for each trait in the .forEach() loop.
      // For each trait being targeted by the filter, the filteredResults
      // array will then contain only the entries that contain the trait,
      // so at the end we'll have an array of animals that have every one
      // of the traits when the .forEach() loop is finished.
      filteredResults = filteredResults.filter(
        animal => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }
  if (query.diet) {
    filteredResults.filter((animal) => animal.diet === query.diet);
  }
  if (query.species) {
    filteredResults = filteredResults.filter(
      (animal) => animal.specisies === query.species
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      (animal) => animal.name === query.name
    );
  }
  // return the filteres results
  return filteredResults;
}
// create route

function findById(id, animalsArray) {
  const result = animalsArray.filter(animal => animal.id === id)[0];
  return result;
}

// app.get('/', (req, res) => {
// res.send('<h1>Hello World!</h1>')
// })
// add the route
app.get('/api/animals', (req, res) => {
  // GET method requires 2 args: 1. string descriibing route client wants to fetch from & 2. callback function to execute everytim route is accessed with GET request
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.get('api/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if(result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

// chain the listen methods to the server
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
