const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

// create route
// app.get('/', (req, res) => {
// res.send('<h1>Hello World!</h1>')
// })
// add the route
router.get('/animals', (req, res) => {
    // GET method requires 2 args: 1. string descriibing route client wants to fetch from & 2. callback function to execute everytim route is accessed with GET request
    let results = animals;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });
  
  router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if(result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });
  
  router.post('/animals', (req, res) => {
    // req.body is where our incoming content will be 
    // console.log(req.body);
  
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();
  
    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
      res.status(400).send('The animal is not propertly formatted.');
    } else {
      // add animal to json file and animals array in this function
      const animal = createNewAnimal(req.body, animals);
      res.json(animal);
    }
  });
  
  module.exports = router;
  